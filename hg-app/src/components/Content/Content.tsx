import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Alert, Row, Col } from 'antd';
import Card from './Card';
import axios from 'axios';

const ContentWrapper = styled.div`
    padding: 10px;
   
    .contents {
        margin-top: 20px;
    }
`;


class Content extends PureComponent {

    constructor(props: any) {
        super(props);
    }

    

    componentDidMount() {
        console.log('进来了----------------------------');
        fetch("https://easy-mock.com/mock/59a90a31e0dc6633419878e6/example/menu/lists", {
            method: 'GET',
            mode: 'cors',
        })  .then(res => res.json())
            .then(json => window.localStorage.setItem("data",JSON.stringify(json)));

        console.log('出来了----------------------------');    
    }

    onClose = (event: any) => {
        console.log(event, 'I was closed.');
    };

    render() {
        let dataArray = null;
        let dataArrayString = localStorage.getItem('data');
        if (dataArrayString) {
            dataArray = JSON.parse(dataArrayString);
        }

        console.log(dataArray);
        return (
            <ContentWrapper>
                <Alert
                    showIcon
                    message="HG温馨提示: 由于链接安全性未知，请在点击访问时确认其安全性"
                    type="warning"
                    closable
                    onClose={(e: any) => this.onClose}
                />
                <div className="contents">
                    <Row gutter={16}>
                        {
                            dataArray && dataArray.map((item: any, index: any) => {
                                return (
                                    <Col key={index} className="gutter-row" span={6}>
                                        <Card
                                            key={index}
                                            name={item.name}
                                            desc={item.desc}
                                            speed={item.speed}
                                            url={item.url}
                                            tags={item.tags}
                                        >
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </div>
            </ContentWrapper>
        );
    }
}

export default Content;
