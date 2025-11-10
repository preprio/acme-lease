export default function YoutubeEmbed(props: { url: string }) {
    if (!props.url) return null
    let youtube_id

    if (props.url.includes('v=')) {
        youtube_id = props.url.split('v=')[1]
    } else {
        let secondPart = props.url.split('be/')[1]
        youtube_id = secondPart.split('?')[0]
    }

    return (
        <iframe
            width='100%'
            height='100%'
            style={{ aspectRatio: '16/9' }}
            src={`https://www.youtube.com/embed/${youtube_id}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
        ></iframe>
    )
}
