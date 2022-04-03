import { SettingOutlined } from "@ant-design/icons";
import gearsStyle from './gears.module.scss';

type GearsProps = {
    rotateGearP: number;
    rotateGearM: number;
}

const Gears: React.FC<GearsProps> = ({rotateGearP, rotateGearM}) => {
    const gearStyleP = {
        transform: 'rotate(' + rotateGearP + 'deg)',
      };
    const gearStyleM = {
        transform: 'rotate(' + rotateGearM + 'deg)',
    };

    return (
        <>
            <SettingOutlined style={gearStyleP} className={gearsStyle.gear__1}/>
            <SettingOutlined style={gearStyleM} className={gearsStyle.gear__2}/>
            <SettingOutlined style={gearStyleP} className={gearsStyle.gear__3}/>
            <SettingOutlined style={gearStyleM} className={gearsStyle.gear__4}/>
            <SettingOutlined style={gearStyleP} className={gearsStyle.gear__5}/>
            <SettingOutlined style={gearStyleM} className={gearsStyle.gear__6}/>
            <SettingOutlined style={gearStyleP} className={gearsStyle.gear__7}/>
            <SettingOutlined style={gearStyleP} className={gearsStyle.gear__8}/>
            <SettingOutlined style={gearStyleM} className={gearsStyle.gear__9}/>
            <SettingOutlined style={gearStyleP} className={gearsStyle.gear__10}/>
            <SettingOutlined style={gearStyleM} className={gearsStyle.gear__11}/>
            <SettingOutlined style={gearStyleP} className={gearsStyle.gear__12}/>
            <SettingOutlined style={gearStyleM} className={gearsStyle.gear__13}/>
            <SettingOutlined style={gearStyleP} className={gearsStyle.gear__14}/>
        </>
    )
};

export default Gears;
