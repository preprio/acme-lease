import Script from 'next/script'
import { headers } from 'next/headers'

export default async function PreprTrackingPixel() {
    const headerStore = await headers()
    const accessTokenHeader = headerStore.get('x-access-token')

    return (
        <Script
            id={'prepr_script'}
            dangerouslySetInnerHTML={{
                __html: `
    ! function (e, t, p, r, n, a, s) {
    e[r] || ((n = e[r] = function () {
    n.process ? n.process.apply(n, arguments) : n.queue.push(arguments)
    }).queue = [], n.t = +new Date, (a = t.createElement(p)).async = 1, a.src = "https://cdn.tracking.prepr.io/js/prepr_v2.min.js?t=" + 864e5 * Math.ceil(new Date / 864e5), (s = t.getElementsByTagName(p)[0]).parentNode.insertBefore(a, s))
    }(window, document, "script", "prepr"), prepr("init", "${accessTokenHeader || process.env.PREPR_GRAPHQL_TOKEN}", {clientSideExperiments:true}), prepr("event", "pageload");
          `,
            }}>
        </Script>
    )
}
