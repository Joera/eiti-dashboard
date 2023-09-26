import { GraphControllerV2  } from '@local/d3_graphs';

import { ChartBarProgression, ChartBarsHorizontal, HtmlFunctionality, HtmlHeader, HtmlLegend, HtmlLegendCustom, HTMLTable, HTMLYear } from '@local/elements';
import { Bar, TCtrlrs } from '@local/d3_types';
import { IGraphMapping } from '@local/d3_types';
import { breakpoints, colourArray, colours, paymentTypes } from '@local/styleguide';
import { EitiData } from '@local/d3_types';
import { filterUnique } from '@local/eiti-services';
import { convertToCurrencyInTable } from '@local/d3-services/_helpers';
import { schemeOranges } from 'd3';

const graphHeight = 420;
const barHeight = 32;

type IntData  = {
    graph: Bar[],
    table: any
}

// can this be a wrapper for multiple graphcontrollers?
export  class EbnProgressionBarsInGroupV1 extends GraphControllerV2  {

    chartAxis;
    chartBar;
    finalRevenueLine;
    zeroLine;
    table;
    funcList;

    bars = {};
    companies = {};
    entity_svgs = {};
    ctrlrs: TCtrlrs = {};

    yScale;
    xScale;
    bottomAxis;
    leftAxis;

    legend;

    constructor(
        public main: any,
        public data : EitiData,
        public element : HTMLElement,
        public mapping: IGraphMapping,
        public segment: string, 
    ){
        super(main,data,element,mapping,segment) 
        this.pre();
    }

    pre() {

        this._addMargin(60,40,0,0);
        this._addPadding(0,100,60,0);

        this._addScale('x','band','horizontal','year');
        this._addScale('y','linear','vertical','value');
        this._addAxis('x','x','bottom');
        this._addAxis('y','y','left','millions')
    }

    async init() {

        const self = this;
        await super._init();


        if(this.data.payments.length < 1) return;

        const svgId = "svg-wrapper-ebn-progression-bars";
        const container = document.createElement('section');
        container.style.height = (window.innerWidth < breakpoints.sm) ? graphHeight.toString() + "px" : graphHeight.toString() + "px";
        container.classList.add("graph-container-12")
        container.classList.add("graph-view")
        container.id = svgId;
        this.element.appendChild(container);

        this.htmlHeader = new HtmlHeader(container,this.segment,"");
        this.htmlHeader .draw();

        this.legend = new HtmlLegendCustom(container);

       
        super._svg(container);

        this.config.paddingInner = .2;
        this.config.paddingOuter =  .2;

        this.chartBar = new ChartBarProgression(this);
        await this.update(this.data,this.segment, false);


        return;
    }

    prepareData(data: EitiData) : any {

        console.log(data);

        return {   
            graph: data.payments,
        }
    }

    async draw(data: IntData) {
      
        this.chartBar.draw(data.graph);


        this.legend.draw([
            {
                label: 'Betalingen voor kosten capex en vergunningen',
                colour: 'orange'
            },
            {
                label: 'Vennootschapsbelasting',
                colour: 'blue'
            },
            {
                label: 'Dividenden',
                colour: 'green'
            },
            {
                label: 'Meeropbrengstregeling (MOR)',
                colour: 'purple'
            }
        ])
    
    }


    async redraw(data: any, range: number[]) {

        this.scales.x.set(data.graph.map ( d => d.year));
        // this.scales.y.set(data.graph.map ( d => d.y));
        this.scales.y.set([0,2500000000]);

        await super.redraw(data.graph);
        // redraw data
        this.chartBar.redraw(this.dimensions);
    }

    
    async update(data: EitiData, segment: string, update: boolean, range?: number[]) {
    
       await super._update(data,segment,update, range);
    } 
}
