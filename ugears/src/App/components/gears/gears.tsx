import { SettingOutlined } from "@ant-design/icons";
import React, { MutableRefObject, Ref, useRef, useState } from "react";
import gearsStyle from './gears.module.scss';

type GearsProps = {
    refArrayM: any;
    refArrayP: any;
}

const Gears: React.FC<GearsProps> = ({refArrayM, refArrayP}) => {

    return (
        <div className={gearsStyle.gear__body}>
            <SettingOutlined ref={refArrayP[0]} className={gearsStyle.gear__1}/>
            <SettingOutlined ref={refArrayM[0]} className={gearsStyle.gear__2}/>
            <SettingOutlined ref={refArrayP[1]} className={gearsStyle.gear__3}/>
            <SettingOutlined ref={refArrayM[1]} className={gearsStyle.gear__4}/>
            <SettingOutlined ref={refArrayP[2]} className={gearsStyle.gear__5}/>
            <SettingOutlined ref={refArrayM[2]} className={gearsStyle.gear__6}/>
            <SettingOutlined ref={refArrayP[3]} className={gearsStyle.gear__7}/>
            <SettingOutlined ref={refArrayM[3]} className={gearsStyle.gear__8}/>
            <SettingOutlined ref={refArrayP[4]} className={gearsStyle.gear__9}/>
            <SettingOutlined ref={refArrayM[4]} className={gearsStyle.gear__10}/>
            <SettingOutlined ref={refArrayP[5]} className={gearsStyle.gear__11}/>
            <SettingOutlined ref={refArrayM[5]} className={gearsStyle.gear__12}/>
            <SettingOutlined ref={refArrayP[6]} className={gearsStyle.gear__13}/>
            <SettingOutlined ref={refArrayM[6]} className={gearsStyle.gear__14}/>
        </div>
    )
};

export default Gears;
