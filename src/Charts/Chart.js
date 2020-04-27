import React, { useRef, useEffect } from 'react'
import '../App.css'
import { select, scaleLinear, scalePoint, max, axisLeft, axisBottom, format} from 'd3'

function Chart({data}) {

    const svgRef = useRef()


    useEffect(() => {
        console.log(data)
        const svg = select(svgRef.current);

        const width = +svg.attr('width')
        const height = +svg.attr('height')
        
        const xValue = d => d.measure;
        const yValue = d => d.dimension;
        const margin = { top: 60, right: 60, bottom: 80, left: 180 }
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;


        const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])
        .nice()
        
        const yScale = scalePoint()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.4)




        const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)


        const xAxis = axisBottom(xScale)
            .tickFormat(format(".1s"))
            .tickSize(- innerHeight)

        const yAxis = axisLeft(yScale)    
            .tickSize(-innerWidth)

        g.append('g')
        .call(yAxis)
        .selectAll('.domain')
        .remove()


        const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`)

        xAxisG.select('.domain')
            .remove()

        xAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', 55)
            .attr('x', innerWidth / 2)
            .text('amount')
            .attr('fill', 'black')

        g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', 8)


        g.append('text')
            .attr('class', 'title')
            .attr('y', -16)
            .text('Margin of Sub Products')

    }, [data])
    
    

    return (
        <React.Fragment>
            <br/>
            <br/>
            <svg ref={svgRef} width="960" height="500"></svg>
        </React.Fragment>

    )
}

export default Chart;
