import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { img } from '../../config/image';
import { menuData } from '../../config/selfData';
import { Switch, Button } from 'antd';



const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
        width: 56px;
        display: block;
        margin: 0 auto;
        z-index: 2;
        opacity: 0.6;
    }
    .title-wrapper {
        margin-top: 1rem;
        text-align: center;
    }
    .title {
        display: block;
        font-size: 1.1rem;
        color: #A56243;
    }
    .desc {
        display: inline-block;
        padding-top: 1rem;
        color: #D3D3D3;
    }
`;

export const TagWrapper = styled.div`
    margin-top: 2.25rem;

    .tag-ul {
        list-style: none;
        text-align: center;
        padding: 0;
        display: inline-block;
        width: 100%;
        height: 450px;
        overflow: scroll;
    }

    .tag-item {
        color: #ffffff;
        padding: .75rem;
    }

    .element::-webkit-scrollbar { width: 0 !important }
`;

const ButtonStyle = styled(Button)`
    margin-top: 16px;
    margin-left: 3px;
`;


class Menu extends PureComponent {
    private renderTemp() {
        return (
            <ul className='tag-ul'>
                {
                    menuData.map((item, index) => {
                        return (
                            <li key={index} className='tag-item'>{item.name}</li>
                        );
                    })
                }
            </ul>
        );
    }
    onChange = (checked: any) => {
        console.log(`switch to ${checked}`);
    }

    jumpUrl = () => {
        window.open('https://github.com/HelloGitHub-Team/GitHubPageHub/blob/master/script/howto.md');
    }
    render() {
        return (
            <div>
                <MenuWrapper>
                    <div className='logo-wrapper'>
                        <img className='logo' src={img.logoImg} />
                        <div className='title-wrapper'>
                            <span className='title'>GithubPageHub</span>
                            <span className='desc'>连接，分享</span>
                        </div>
                        <ButtonStyle onClick={this.jumpUrl} type="primary">提交你的博客</ButtonStyle>
                    </div>
                </MenuWrapper>
                <TagWrapper>
                    {this.renderTemp()}
                </TagWrapper>
            </div>
        );
    }
}



export default Menu;
