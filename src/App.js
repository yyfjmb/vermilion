import React, { Component } from 'react';
import $ from 'jquery';
import fullpage from 'fullpage.js'
import 'fullpage.js/jquery.fullPage.css'
import d3 from 'd3'
import './App.css';
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/funnel');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
let Slider = require('react-slick');

import logo from './images/vermilion.svg';
import coverImage from './images/cover.jpg';
import cover1 from './images/video1.mp4'
import cover2 from './images/video2.mp4'
import cover3 from './images/video3.mp4'
import cover4 from './images/video4.mp4'
import cover5 from './images/video5.mp4'
import cover6 from './images/video6.mp4'

import film from './images/film.jpg';
import pr from './images/pr.jpg';
import social from './images/social.jpg';
import bgPatternImg from './images/vertical_cloth.png';
import stephanie from './images/stephanie.png';
import daniel from './images/daniel.png';
import people1 from './images/people1.png';
import people2 from './images/people2.png';
import people3 from './images/people3.png';
import pattern from './images/pattern.png'
import piePatternSrc from './images/pie_pattern.png'
import content_bg from './images/content_bg.jpg'
import pr_bg from './images/pr_bg.jpg'
import ms1 from './images/ms1.jpg'
import ms2 from './images/ms2.jpg'
import ms3 from './images/ms3.png'
import ms4 from './images/ms4.png'
import facebook from './images/share_facebook.svg'
import linkedin from './images/share_linkedin.svg'
import wechat from './images/share_wechat.svg'
import weibo from './images/share_weibo.svg'

$(document).ready(function() {

    var window_width = $(window).width(),
        window_height = $(window).height()

    var margin = {top: 0, right: 160, bottom: 0, left: 450},
    width = window_width - margin.right - margin.left,
    height = window_height*0.9 - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("#mindmap").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("https://yyfjmb.github.io/vermilion-data/flare.json", function(error, flare) {
  if (error) throw error;

  root = flare;
  root.x0 = height / 2;
  root.y0 = 0;

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  root.children.forEach(collapse);
  // update(root);
});

d3.select(self.frameElement).style("height", "800px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 150; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "#E2ABAB" : "#9F0000"; })

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -20 : 20; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 8)
      .style("fill", function(d) { return d._children ? "#E2ABAB" : "#9F0000"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

function start_expand() {
  update(root);
  setTimeout(function(){
      click(root.children[0])
      click(root.children[1])
      click(root.children[2])
      click(root.children[3])
  }, 1000);
  setTimeout(function(){
      click(root.children[1].children[0])
      click(root.children[1].children[1])
      click(root.children[2].children[0])
      click(root.children[2].children[1])
      click(root.children[3].children[0])
      click(root.children[3].children[1])
  }, 2000);
}

function start_expand_reverse() {
  setTimeout(function(){
      click(root.children[1].children[0])
      click(root.children[1].children[1])
      click(root.children[2].children[0])
      click(root.children[2].children[1])
      click(root.children[3].children[0])
      click(root.children[3].children[1])
  }, 100);
  setTimeout(function(){
      click(root.children[0])
      click(root.children[1])
      click(root.children[2])
      click(root.children[3])
  }, 200);
  
}



    var barChart = echarts.init(document.getElementById('bar_chart'));
    // var pieChart = echarts.init(document.getElementById('pie_chart'));
    // var funnelChart = echarts.init(document.getElementById('funnel_chart'));

    var piePatternImg = new Image();
    piePatternImg.src = piePatternSrc;

    var itemStyle = {
        normal: {
            opacity: 0.7,
            color: '#C98388',
            borderWidth: 2,
            borderColor: '#5C1212'
        }
    };
    // pieChart.setOption({
    //   title: {
    //     text: 'Mobile Data Consumption',
    //     left: 'center',
    //     top: 20,
    //     textStyle: {
    //       fontFamily: 'Playfair Display SC',
    //       color: '#5C1212',
    //       fontSize: 14
    //     }
    //   },
    //   tooltip: {},
    //   series: [{
    //       name: 'Activity',
    //       type: 'pie',
    //       radius : '55%',
    //       center: ['50%', '60%'],
    //       selectedMode: 'single',
    //       selectedOffset: 30,
    //       clockwise: true,
    //       label: {
    //           normal: {
    //               textStyle: {
    //                   fontSize: 13,
    //                   color: '#5C1212',
    //                   fontFamily: 'Playfair Display'
    //               }
    //           }
    //       },
    //       labelLine: {
    //           normal: {
    //               lineStyle: {
    //                   color: '#5C1212'
    //               }
    //           }
    //       },
    //       data:[
    //           {value:27.7, name:'WeChat'},
    //           {value:26.9, name:'Browsers'},
    //           {value:22.3, name:'Other'},
    //           {value:14.4, name:'QQ'},
    //           {value:8.6, name:'Gaming'}
    //       ],
    //       itemStyle: itemStyle
    //   }]
    // })

    function setFunction(){

    barChart.setOption({
      color: ['#7D2323'],
      title: { 
        text:'Leading Social Networks Worldwide',
        left: 'center',
        top: 20,
        textStyle: {
          fontFamily: 'Playfair Display SC',
          color: '#5C1212',
          fontSize: 14
        }
      },
      tooltip: {},
      xAxis: {
          data: ["Facebook","WeChat","Weibo","LinkedIn"],
          axisLabel: {
            textStyle: {
              fontSize: 10,
              fontFamily: 'Playfair Display'
              }
            }
      },
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      },
      yAxis: {},
      series: [{
          name: 'No. of active user (in millions)',
          type: 'bar',
          barWidth: '40%',
          data: [1712, 806, 282, 106],
          label: {
              normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                      fontSize: 13,
                      color: '#5C1212'
                  }
              }
          },
          itemStyle: itemStyle,
          animationDelay: function (idx) {
            return idx * 1000;
          }
        }]
      });
    }


    

    $('#fullpage').fullpage({
      verticalCentered: true,
      menu: '#nav_bar',
      lockAnchors: false,
      anchors:['home', 'whtwedo', 'ct', 'pr', 'sm', 'ms', 'people'],
      showActiveTooltip: true,
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      afterLoad: function(anchorLink, index){
        //playing the video
        if (anchorLink === 'home') {
          $('.cover_video').get(0).play();
          $('.cover_video').get(1).play();
          $('.cover_video').get(2).play();
          $('.cover_video').get(3).play();
          $('.cover_video').get(4).play();
          $('.cover_video').get(5).play();
        }

        if (anchorLink === 'ct') {
          $('.video video').get(0).play();
        }

        if (anchorLink === 'pr') {
          $('.video video').get(1).play();
        }

        if (anchorLink === 'whtwedo') {
          start_expand()
        }

        if (anchorLink === 'sm') {
          setFunction();
        }
      },
      onLeave: function(index, nextIndex, direction){
        if (index === 2) {
          start_expand_reverse()
        }
      }
    });
});

let background_dot = {backgroundImage: 'url(' + pattern + ')', backgroundSize: '200px 200px'}
let background_writing = {backgroundImage: 'url(' + content_bg + ')'}
let background_pr = {backgroundImage: 'url(' + pr_bg + ')'}
let ms1_bg = {backgroundImage: 'url(' + ms1 + ')'}
let ms2_bg = {backgroundImage: 'url(' + ms2 + ')'}
let ms3_bg = {backgroundImage: 'url(' + ms3 + ')'}
let ms4_bg = {backgroundImage: 'url(' + ms4 + ')'}

let pages = [
    {anchor: "whtwedo", cls: "", href: "#whtwedo", content: "What We Do", video: cover1},
    {anchor: "ct", cls: "", href: "#ct", content: "Content Solution", video: cover2},
    {anchor: "pr", cls: "", href: "#pr", content: "Public Relations", video: cover3},
    {anchor: "sm", cls: "", href: "#sm", content: "Social Media", video: cover4},
    {anchor: "ms", cls: "", href: "#ms", content: "Marketing Strategy", video: cover5},
    {anchor: "people", cls: "", href: "#people", content: "Who We Are", video: cover6}
  ]

let headshot = [
    {name: "Daniel Inman", content: "Daniel Inman is an experienced financial writer who has worked in Hong Kong, China and Japan for more than a decade. He most recently covered markets across Asia and China’s financial system for The Wall Street Journal. Before that he was a deal reporter at FinanceAsia, a leading sell-side trade publication, where he also wrote about the Chinese economy. Daniel has a strong understanding of finance and economics across Asia –in addition to an awareness of how the region fits into the global financial system. He has a special focus on China. He has also provided marketing consultancy services to several of the world’s largest financial institutions –creating high-quality content for a number of global banks as well as several asset management companies. Daniel is from the United Kingdom and has a B.A. and MPhil in Philosophy from University College London.", src: daniel, title: "Director"},
    {name: "Stephanie Cheung", content: "Stephanie is a public relations professional who has served clients in both the financial and luxury goods industries. She previously worked at FinanceAsia, where she helped arranged conferences and large banquets. After that, she gained hands-on PR and social marketing experience in China working on projects for high-profile clients -such as Chanel, Baccarat, American Airlines, Pernod Ricard etc.", src: stephanie, title: "Vice Director"},
    {name: "Wynne Wang", content: "Wynne is a former financial journalist, who most recently worked at The Wall Street Journal in Shanghai, where she covered fixed income and the renminbi for close to a decade. Before that, she was worked at Oriental Morning Post. She graduated from Fudan University.", src: people2, title: "Journalist"},
    {name: "Stella Shu", content: "Stella is a life-style editor. For more than 10 years, and has written for both English and Chinese language media.", src: people1, title: "Life-style editor"},
    {name: "Li Jia", content: "Li Jia is a highly experienced translator that has worked in house at the Chinese securities regulator in Beijing and at the Shanghai Futures Exchange. A seasoned simultaneous interpreter, Li Jia has an extensive knowledge of finance that she is able to use to create fast and accurate translations from English to Chinese and vice versa. She has provided interpretation services for countless corporate clients and is a graduate of Zhejiang University.", src: people3, title: "Translator"},
    
  ]

let App = React.createClass({
  getInitialState() {
    let opacity_array
    let text_content
    let title
    let name
    return {
      opacity_array: [1,0,0,0,0,0],
      text_content: headshot[0].content,
      title: headshot[0].title,
      name: headshot[0].name
    };
  },

  handleMouseOver(order) {
    var new_opacity_array = [0,0,0,0,0,0];
    for (var i in new_opacity_array) {
      if (Number(i) === order) {
        new_opacity_array[i] = 1
      } else {
        new_opacity_array[i] = 0
      }
    }
    this.setState({
      opacity_array: new_opacity_array
    }) 
  },

  changeTextHandler(order) {
    this.setState({
      text_content: headshot[order].content,
      title: headshot[order].title,
      name: headshot[order].name
    }) 
  },

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div className="App">
        <ul id="nav_bar">
          {pages.map((page, idx) =>
          <li key={page.anchor} data-menuanchor={page.anchor} className={page.cls}>
            <a href={page.href} onMouseOver={this.handleMouseOver.bind(this, idx)} >{page.content}</a>
          </li>
          )}
        </ul>
        <div id="title">
          <img src={logo}/>
        </div>
        <div id="fullpage">
            <section className="section">
              <div id="cover">
                {pages.map((page, idx) => 
                <video className="cover_video" style={{opacity: this.state.opacity_array[idx]}} src={page.video} poster={coverImage} autoPlay loop muted></video>
                )}
              </div>
            </section>
            <section className="section" style={background_dot}>
              <div className="container">
                <div id="introduction">
                  <h2>What We Do</h2>
                  <p>Vermillion Asia is a marketing and communications company operating out of Shanghai and Hong Kong. We are committed to providing innovative solutions that help our clients deliver a powerful message.</p>
                  <p>Established in 2015, we have already worked with a diverse range of international and Chinese clients in both the financial and consumer sectors – including banks, asset managers, technology firms, as well as luxury and lifestyle companies.</p>
                </div>
                <div id="mindmap">
                </div>
              </div>
            </section>
            
            <section className="section ct" style={background_dot}>
            <div className="video desktop">
              <video  src={pages[1].video} poster={coverImage} autoPlay loop muted></video>
            </div>
              <div className="container">
                <div className="intro_container">
                  <div className="introduction">
                    <h2>Content Solution</h2>
                    <div className="desktop">
                      <p>Vermilion Asia offers a comprehensive suite of content marketing solutions – providing everything from guidance at the strategic level to creating high-quality written materials that stand out in an environment where differentiation is of the utmost importance.</p>
                      <p>It is our belief that as companies face increasing demands to publish, the case for working with content specialists becomes more compelling. We are former journalists who have worked for top-tier publications in Asia, which means we have the necessary industry and regional knowledge, along with the right story-telling skills, to turn a corporate story into a compelling narrative.</p>
                    </div>
                    <div className="mobile">
                      <p>Vermilion Asia offers a comprehensive suite of content marketing solutions – providing everything from guidance at the strategic level to creating high-quality written materials that stand out in an environment where differentiation is of the utmost importance.</p>
                    </div>
                  </div>
                </div>
                <div className="content_container">
                  <div className="content_list">
                    <Slider {...settings}>
                      <div>
                        <h3 className="highlight">Thought Leadership</h3>
                        <p>Thought leadership is one of the best ways that knowledge-based companies in industries such as finance and technology can showcase their expertise to a wide range of stakeholders. Innovative and informative content can help establish a company or an individual professional as a leading expert in their respective field.</p>
                        <p className="desktop">Well-written content is one of the best ways to highlight a company’s expertise, especially in a knowledge-based industry such as finance. We have written op-eds that have been published in high-profile media for some of the region’s most senior bankers and investors, as well as white papers for international and Chinese banks and asset managers.</p>
                      </div>
                      <div><h3 className="highlight">Marketing Materials</h3> A company’s brand can be enhanced and its capabilities highlighted by strong content. The possibilities are endless: we have sourced an original romantic novel in Chinese to be published on social media; we have created financially-informed materials from client events to spread the message to clients that are not able to attend in person; and we have</div>
                    </Slider>
                  </div>
                </div>
              </div>
            </section>

            <section className="section pr" style={background_dot}>
              <div className="video desktop">
                <video  src={pages[5].video} poster={coverImage} autoPlay loop muted></video>
              </div>
              <div className="container">
                <div className="intro_container">
                  <div className="introduction">
                    <h2>Public Relations</h2>
                    <p>In an increasingly crowded media landscape, it is harder than ever before for companies deliver a message that differentiates them from the crowd. A well-planned public relations strategy that is successfully executed can really raise a company’s profile above its competitors.</p>
                  </div>
                </div>
                <div className="content_container">
                  <div className="content_list">
                    <Slider {...settings}>
                      <div><h3 className="highlight">Media relations</h3>
                      <p>Vermilion Asia is able to manage the communication efforts of financial companies that want to showcase their strengths in the media to an audience of existing and potential clients. We have advised and provided PR services to asset managers, financial technology firms and government clients. </p>
                      <p className="desktop">With practical journalism experience in both international media and regional trade publications, we understand what reporters want and how best to pitch them in a way that maximizes exposure.
                      </p>
                      </div>
                      <div><h3 className="highlight">Media training</h3>
                        <div className="desktop">
                          <p>Vermilion Asia’s media training services prepares professionals to become effective spokespeople who can clearly and confidently deliver their message in the media.</p>
                          <p>Our tailor-made session employ practical learning techniques to help spokespeople appear at their very best when speaking to journalists at magazines, newspapers, and on the television.</p>
                          <p>As former journalists with extensive experience working in both international and trade publications, we are able to help everyone from beginners who have yet to face their first interview to more seasoned professional who want to improve their media skills.
                          </p>
                        </div>
                        <div className="mobile">
                          Vermilion Asia’s media training services prepares professionals to become effective spokespeople who can clearly and confidently deliver their message in the media. Our tailor-made session employ practical learning techniques to help spokespeople appear at their very best when speaking to journalists at magazines, newspapers, and on the television.
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </section>

            <section className="section sm" style={background_dot}>
              <div className="container">
                <div className="intro_container">
                  <div className="introduction">
                    <h2>Social Media</h2>
                    <p>Vermilion Asia offers a full range of social media services – ranging from campaign strategy, account management to content creation – that strengthens a client’s online presence. Working with a number of international and Chinese platforms, we have a particular on WeChat – China’s most powerful social application. We are one of the first companies to support an international financial firm’s efforts on WeChat.</p>
                  </div>
                </div>
                <div className="content_container">
                  <div className="chart_explain desktop">
                    <p>Strong content is the foundation of any successful social media strategy. Good materials are punchy, easy to digest, and shareable. We believe that the key platform for a professional audience is LinkedIn, while companies looking to interact with a customer base in China have to consider a presence on WeChat (Weixin). </p>
                    <p>WeChat was launched in 2010 as a messaging app for smartphones. It now has more than 800 million active users, and it has incorporated a wide range of features to become China’s one-stop social networking app. The app has a diverse user base that cuts across the entire spectrum of society.</p>
                    </div>
                  <div id="bar_chart"></div>
                </div>
              </div>
            </section>

            <section className="section ms" style={background_dot}>
              <div className="container">
                <div className="intro_container">
                  <div className="introduction">
                    <h2>Marketing Strategy</h2>
                    <p className="desktop">At Vermilion Asia, we believe marketing should take a strategic approach that incorporates several complementary techniques in order to ensure that a campaign has maximum impact. This can include brand management, content marketing, public relations, and events. With deep experience in all these areas, we are able to design and execute highly effective campaigns that deliver results.</p>
                    <p>With an on-the-ground presence in China, we are able to assist clients in one of the world’s most dynamic economies – delivering solutions that are local, while meeting international standards.
                    </p>
                  </div>
                </div>
                <div className="content_container">
                  <div className="content_list">
                    <Slider {...settings}>
                      <div>
                        <div className="ms_image" style={ms1_bg}></div>
                        <h3 className="highlight">BRAND MANAGEMENT</h3>
                        <p>Vermilion Asia executes events that are able to strengthen a companys relationship with its clients, while at the same time providing networking opportunities for guests. <span className="desktop">We arrange formal dinners and banquets, offsites for staff and clients, as well as conferences.We can handle every step of the process – from the initial planning stages, designing and sourcing materials, as well as on-the-day execution.</span></p>
                      </div>
                      <div>
                        <div className="ms_image" style={ms2_bg}></div>
                        <h3 className="highlight">Events</h3>
                        <p>We are experienced in the full spectrum of brand work, from helping shape the new public faces of start-up companies, to maintaining the appropriate image of established global companies, <span className="desktop">to introducing new faces into established local markets. We can advise where your brand sits in relation to your competitors and help you build your image in the places it matters most.</span></p>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </section>

            <section className="section" style={background_dot}>
              <div className="container">
                <div id="headshot">
                  <div className="headshot_container">
                    {headshot.map((head, idx) =>
                    <div className="headshot_thumb" onMouseOver={this.changeTextHandler.bind(this, idx)}>
                      <img src={head.src}/>
                      <div className="headshot_name">{head.name}</div>
                    </div>
                    )}
                  </div>
                  <div className="text_container">
                    <div className="title">
                      <h2>{this.state.name}</h2>
                      <h3>{this.state.title}</h3>
                    </div>
                    <div className="description">{this.state.text_content}</div>
                  </div>
                </div>
              </div>
            </section>
        </div>
      </div>
    );
  }
})

export default App;
