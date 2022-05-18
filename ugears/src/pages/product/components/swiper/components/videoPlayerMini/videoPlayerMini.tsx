import videoStyle from './video.module.scss'

type VideoPlayerMiniProps = {
    url: string;
}

const VideoPlayerMini: React.FC <VideoPlayerMiniProps> = ({ url }) => {
    
    
    return (
        <video className={videoStyle.video} muted autoPlay loop>
            <source src = {url} type = "video/mp4"/>
        </video>
        )
};

export default VideoPlayerMini;