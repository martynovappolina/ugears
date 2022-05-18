import videoStyle from './video.module.scss'

type VideoPlayerProps = {
    url: string;
}

const VideoPlayer: React.FC <VideoPlayerProps> = ({ url }) => {
    return (
        <video className={videoStyle.video} autoPlay muted controls>
            <source src = {url} type = "video/mp4"/>
        </video>
    )
};

export default VideoPlayer;
