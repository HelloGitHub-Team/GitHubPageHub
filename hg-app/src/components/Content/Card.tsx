import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { img } from '../../config/image';
import { Button, Tag } from 'antd';

const CardWrapper = styled.div`
    background-color: #534C5E;
    margin-bottom: 20px;
    border-radius: 3px;
    margin-left: 2px;
    margin-right: 2px;
    padding: 10px;
    height: 180px;

    .happy-img {
        width: 28px;
    }

    .header-title {
        padding-left: 5px;
        color: #fff;
    }

    .card-desc-wrapper {
        margin-top: 10px;
        color: #8F8A91;
        height: 46px;
    }

    .good-status {
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 50%;
        background-color: #00a79d;
        border: 1px solid #00a79d;
    }

    .warning-status {
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 50%;
        background-color: #ffdd67;
        border: 1px solid #ffdd67;
        
    }

    .error-status {
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 50%;
        background-color: #cf455c;
        border: 1px solid #cf455c;
    }

    .speed {
        margin-left: 10px;
        color: #8F8A91;
    }

    .spped-box {
        display: inline-block;
    }

    .card-tag {
        height: 50px;
    }

`;

const TagStyle = styled(Tag) `
    margin-top: 5px;
`;

interface CardProps {
    name?: string,
    desc?: string,
    speed?: number,
    tags?: [],
    url?: string
}

class Card extends PureComponent<CardProps> {
    private goStatus(speed: any) {
        if(speed) {
            if (speed < 1) {
                return (
                    <div className='spped-box'>
                        <div className='good-status'></div>
                        <span className='speed'>{speed}</span>
                    </div>
                );
            }

            if (speed > 1 && speed < 3) {
                return (
                    <div className='spped-box'>
                        <div className='warning-status'></div>
                        <span className='speed'>{speed}</span>
                    </div>
                );
            }

            if (speed > 3) {
                return (
                    <div className='spped-box'>
                        <div className='error-status'></div>
                        <span className='speed'>{speed}</span>
                    </div>
                );
            }
           
        }
       
    }

    goWebSite = () => {
        window.open(this.props.url);
    }   

    render () {
        let { name, desc, speed, tags, url } = this.props;
        console.log(typeof tags);
        return (
            <CardWrapper>
                <div className='card-header'>
                    <img className='happy-img' src={img.happyImg} />
                    <span className='header-title'>{name}</span>
                </div>
                <div>
                <div className='card-tag'>
                    {
                        tags && 
                        tags.map((item, index) => {
                            return (
                                <TagStyle key={index}>{item}</TagStyle>
                            );
                        })
                    }
                </div>
                </div>
                <div className='card-desc-wrapper'>
                    <p className='card-desc'>{desc}</p>
                </div>
                <div className='card-desc-footer'>
                    {this.goStatus(speed)}
                    <Button type="link" onClick={this.goWebSite}>点击访问</Button>
                </div>
            </CardWrapper>
        );
    }
}
export default Card;

