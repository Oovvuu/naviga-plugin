import BrightcovePlayer from '../components/brightcovePlayer';

const OovvuuConverter = {
    type: 'oovvuunode',
    tagName: 'object',
    matchElement: function(el) {
        return el.is('object[type="x-oovvuu/oovvuu-embed"]')
    },

    import: function(el, node) {
        node.id = el.attr('id')
        node.brightcoveAccountId = el.find('brightcoveAccountId').text()
        node.brightcovePlayerId = el.find('brightcovePlayerId').text()
        node.brightcoveVideoId = el.find('brightcoveVideoId').text()
        node.embed = el.find('brightcoveVideoId').text()
    },

    export: function(node, el, converter) {
        const $$ = converter.$$
        el.attr({
            id: node.id,
            type: 'x-oovvuu/oovvuu-embed',
        })

        el.append([
            $$('data').append([
                $$('accountId').text(node.brightcoveAccountId),
                $$('playerId').text(node.brightcovePlayerId),
                $$('videoId').text(node.brightcoveVideoId),
                $$('embed').text(JSON.stringify(node.embed)),
            ]),
        ]);
    }
}

export {OovvuuConverter}
