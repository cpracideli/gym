interface VideoViewerProps {
    url:string;
}

const VideoViewer = (props:VideoViewerProps) => {

    return(
        <div style={{display: props.url === undefined ? "none" : "block"}}>
            <iframe 
            height="240" 
            width="100%" 
            src={props.url}
            // src='https://www.youtube.com/embed/u_O9LmJyFIk'
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
             />
        </div>
    )

}

export default VideoViewer;
