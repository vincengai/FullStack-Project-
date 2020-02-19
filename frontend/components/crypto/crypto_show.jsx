import React from 'react';
import { fetch1DayInfo } from '../../util/coin_api_util';
import {
    LineChart, Line, XAxis, YAxis, Tooltip
} from 'recharts';

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
// import RechartContainer from '../chart/rechart_container'

class CustomTooltip extends React.Component {

    render() {
        const { active } = this.props || {};
        if (active) {
            const { payload } = this.props || [{}];

            let date = payload[0].payload.time;						//=> 1564358400
            let day = new Date(date * 1000);						//=> Sun Jul 28 2019 20:00:00 GMT-0400 (Eastern Daylight Time)		DATE OBJECT! NOT STRING

            let time = day.toLocaleTimeString();					//=> '8:00:00 PM'
            let amOrPm = time.slice(-2);							//=> 'PM'

            time = time.slice(0, 4) + ' ' + amOrPm;					//=> '8:00 PM'
            day = day.toString().slice(4, 10);						//=> 'Jul 28'

            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{`$ ${payload[0].value}`}</p>
                    <p className="tooltip-time">{`${day} ${time}`}</p>
                </div>
            );
        }
        return null;
    }
}

class CryptoShow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentPrice: '',
            // "1D": [],
            // "1W": [],
            // "1M": [],
            // "1Y": [],
            "timePeriodActive": '',
            "data": [],
            "dataPeriod": '',
            "dataActive": '',
            modalOn: false,
            fade: false
            
        }

        // All for the Top Container
        this.price = this.price.bind(this);
        this.volume = this.volume.bind(this);
        this.marketCap = this.marketCap.bind(this);
        this.supply = this.supply.bind(this);

        // All for the ReChart Info 
        this.get1DayPrices = this.get1DayPrices.bind(this);
        this.get1WeekPrices = this.get1WeekPrices.bind(this);
        this.get1MonthPrices = this.get1MonthPrices.bind(this);
        this.get1YearPrices = this.get1YearPrices.bind(this);

        // All for Modal Info 
        this.triggerModal = this.triggerModal.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    };
    
    componentDidMount() {
        const symbol = this.props.match.params.symbol

        this.props.fetchCoinInfo(symbol)

        if ( this.state.dataPeriod === '' ) {
            this.get1YearPrices(symbol);
        }
        
        
    };

    // componentDidUnmount() {
        // Remove Ajax Fetches when we click outside of the price page, preventing from max API Calls
    // };

    // Methods used for Top Bar Container
    price() {
        let coinArr = Object.values(this.props.coinInfo);

        return (
            coinArr.map( (coinObj, i) => {
                return (
                    <div key={i}> {coinObj.USD.PRICE} </div>
                )
            })
        )
    }

    supply() {
        let coinArr = Object.values(this.props.coinInfo);

        return (
            coinArr.map((coinObj, i) => {
                return (
                    <div key={i}> {coinObj.USD.SUPPLY} </div>
                )
            })
        )
    }

    volume() {
        let coinArr = Object.values(this.props.coinInfo);
        
        return (
            coinArr.map((coinObj, i) => {
                return (
                    <div key={i}>{coinObj.USD.TOPTIERVOLUME24HOUR} ({coinObj.USD.TOPTIERVOLUME24HOURTO})</div>
                )
            })
        )
    }

    marketCap() {
        let coinArr = Object.values(this.props.coinInfo);

        return (
            coinArr.map((coinObj, i) => {
                return (
                    <div key={i}>{coinObj.USD.MKTCAP}</div>
                )
            })
        )
    }

    // Methods for ReChart Info

    calculateData() {
        let data = this.state.data;
        const prices = [];

        for (let i = 0; i < data.length; i++) {
            prices.push(parseFloat(data[i].close))
        }

        const min = Math.min(...prices);
        const max = Math.max(...prices);
        
        return {
            min,
            max,
        
        }
    };

    get1DayPrices(symbol) {
        let {fetch1DayInfo}  = this.props;

        this.setState({
            dataPeriod: "1D",
            dataActive: 'day-active'
        });

        fetch1DayInfo(symbol).then ( (response) => {
            
            return this.setState({
                data: response.data.Data.Data,
                "timePeriodActive": "day"
            });
        });
    }

    get1WeekPrices(symbol) {
        let {fetch1WeekInfo}  = this.props;

        this.setState({
            dataPeriod: "1W",
            dataActive: 'week-active'
        });

        fetch1WeekInfo(symbol).then ( (response) => {
            return this.setState({
                data: response.data.Data.Data, // Might need to go in one more level
                // ["1W"]: response.data.Data.Data, // Might need to go in one more level 
                "timePeriodActive": "week"
            });
        });
    }

    get1MonthPrices(symbol) {
        let { fetch1MonthInfo } = this.props;

        this.setState({
            dataPeriod: "1M",
            dataActive: 'month-active'
        });

        fetch1MonthInfo(symbol).then ( (response) => {
            return this.setState({
                data: response.data.Data.Data, // Might need to go in one more level
                // ["1M"]: response.data.Data.Data,
                "timePeriodActive": "month"
            });
        });
    }

    get1YearPrices(symbol) {
        let { fetch1YearInfo } = this.props; 

        this.setState({
            dataPeriod: "1Y",
            dataActive: 'year-active'
        });

        fetch1YearInfo(symbol).then ( (response) => {
            return this.setState({
                data: response.data.Data.Data, // Might need to go in one more level
                // ["1Y"]: response.data.Data.Data,
                "timePeriodActive": "year"
            });
        });
    }

    // Modal 

    triggerModal() {
        const state = getState();

        // If user is NOT logged in, redirect to Sign Up Page
        if (state.session.id == null) {
            alert('You must be signed in to trade');
            this.props.history.push('/signup');
        } else {																						// If user IS logged in, 
            // Toggle local state of modal to true
            this.setState({
                modalOn: true,
                symbolClicked: symbol,
                priceClicked: price
            });
        }
    }


    renderModal() {
        const symbol = this.props.coin;
        const price = this.state.price;

        if (this.state.modalOn) {
            return <TradeModal symbol={symbol} toggleModal={this.hideModal} price={price} />
        } else {
            return null;
        }
    }

    hideModal() {
        this.setState({
            modalOn: false
        });
    }



    render() {
        if (this.props.coinInfo === undefined) return null;
        let { coin } = this.props;
        let obj = window.imageUrl;
        let path = obj[coin];

        let symbol = this.props.match.params.symbol
        let { min, max } = this.calculateData(); 


        return (    
            <div>

                   <div className="show-header">
                        <div className='head-name'><img src={path} id='h-icon'/></div>
                        <div>{this.props.coin}</div>
                        <div>{this.price()}</div>

                    </div>

                <div className="outter-most-show">
                 

                    <div className="show-table-container">
                        <div className="flex-table-header">
                            <div className="flex-row"> Market Cap
                                <div className='show-text'>
                                    {this.marketCap()}
                                </div>
                            </div>
                            
                            <div className="flex-row">24h Vol(Global)
                                <div className='show-text'>
                                    {this.volume()}
                                </div>
                            </div>

                            <div className="flex-row">Circulating Supply
                                <div className='show-text'>
                                    {this.supply()}
                                </div>
                            </div>
                            <div className="flex-row">Issue Date
                                <div className='show-text'>
                                    2008-10-31
                                </div>
                            </div>

                            <div className="flex-row">Issue Price
                                <div className='show-text'>
                                    {this.price()}
                                </div>
                            </div>
                        </div> 
                    </div>

                    <div className="timeframe">
                            <li className="timeframe-list" onClick={() => this.get1DayPrices(symbol)}> 1D </li>
                            <li className="timeframe-list" onClick={() => this.get1WeekPrices(symbol)}> 1W </li>
                            <li className="timeframe-list" onClick={() => this.get1MonthPrices(symbol)}> 1M </li>
                            <li className="timeframe-list" onClick={() => this.get1YearPrices(symbol)}> 1Y </li>
                    </div>

                    <div className="tradeButton">
                        {this.renderModal()}
                    </div>
                    
                    <div className="linechart">
                        <LineChart width={550} height={405} data={this.state.data} margin={{
                            top: 0, right: 0, left: 0, bottom: 0
                        }} cursor="crosshair">
                            {/* <Tooltip content={<CustomTooltip />} offset={-50} animationDuration={100} />  */}

                            <XAxis
                                hide={true}
                                tickLine={false} />
                            <YAxis
                                hide={true}
                                domain={[dataMin => (dataMin * 0.80), dataMax => (dataMax * 1.05)]} />
                            <Tooltip
                                cursor={false}
                                labelStyle={{ display: 'none' }}
                            />

                            <Line
                                type="monotone"
                                dataKey="close"
                                stroke="#8884d8"
                                activeDot={{ r:5 }}
                                strokeWidth={1.7}
                                dot={false}
                                activeDot={false}
                                name="$"
                            />

                        </LineChart>
                    </div>

                </div>

            </div>
        )
    }


}
export default CryptoShow;
