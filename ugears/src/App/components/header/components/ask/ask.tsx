import askStyle from './ask.module.scss'

type AskProps = {
    visible: boolean;
}

const Ask: React.FC<AskProps> = ({ visible }) => {
    if(visible) return (
        <div className={askStyle.ask}>
            
        </div>
    )
    return null;
};

export default Ask;
