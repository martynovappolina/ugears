type VideoPlayerProps = {
    url: string;
}

const VideoPlayer: React.FC <VideoPlayerProps> = ({ url }) => {
    return (
        <iframe width="400" height="400" frameBorder="0" src={url + "?autoplay=1"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    )
};

export default VideoPlayer;
