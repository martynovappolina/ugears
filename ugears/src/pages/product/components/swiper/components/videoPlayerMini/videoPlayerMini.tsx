type VideoPlayerMiniProps = {
    url: string;
}

const VideoPlayerMini: React.FC <VideoPlayerMiniProps> = ({ url }) => {
    return (
        <iframe width="100" height="90" frameborder="0" src={url + '?mute=1&controls=0'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
    )
};

export default VideoPlayerMini;