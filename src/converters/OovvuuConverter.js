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
        node.embed = el.find('embed').text()
    },

    export: function(node, el, converter) {
        const $$ = converter.$$
        el.attr({
            id: node.id,
            type: 'x-oovvuu/oovvuu-embed',
        })

        el.append([
            $$('data').append([
                $$('brightcoveAccountId').text(node.brightcoveAccountId),
                $$('brightcovePlayerId').text(node.brightcovePlayerId),
                $$('brightcoveVideoId').text(node.brightcoveVideoId),
                $$('embed').text(node.embed),
            ]),
        ]);
    }
}

export {OovvuuConverter}
