import {Component} from 'substance'

class OovvuuComponent extends Component {
    render($$) {
        const el = $$('div')

        // @TODO: Example embed, please remove before releasing.
        el.append([
            $$('h2').append('Oovvu Test Embed'),
            $$('div').append([
                $$('iframe').attr('src', 'https://players.brightcove.net/6146357338001/RepNRAHPdQ_default/index.html?videoId=6230829618001')
                    .attr('allowfullscreen', true)
                    .attr('webkitallowfullscreen', true)
                    .attr('mozallowfullscreen', true)
            ]),
        ])

        return el
    }
}

export {OovvuuComponent}
