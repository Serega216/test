jQuery(document).ready(function($) {
    if (typeof wp === 'undefined' || typeof wp.media === 'undefined') {
        return;
    }

    var media = wp.media;

    media.view.AttachmentFilters.TypeFilter = media.view.AttachmentFilters.extend({
        createFilters: function() {
            var filters = {};
            filters.all = {
                text: 'Все типы',
                props: { typeFilter: '' }
            };

            filters.image = {
                text: 'Изображения',
                props: { typeFilter: 'image' }
            };

            filters.audio = {
                text: 'Аудио',
                props: { typeFilter: 'audio' }
            };

            this.filters = filters;
        }
    });

    media.view.AttachmentFilters.YearFilter = media.view.AttachmentFilters.extend({
        createFilters: function() {
            var filters = {};
            filters.all = {
                text: 'Все года',
                props: { yearFilter: '' }
            };

            filters.y2023 = {
                text: '2023',
                props: { yearFilter: '2023' }
            };

            filters.y2024 = {
                text: '2024',
                props: { yearFilter: '2024' }
            };

            this.filters = filters;
        }
    });

    var oldBrowser = media.view.AttachmentsBrowser;
    media.view.AttachmentsBrowser = oldBrowser.extend({
        createToolbar: function() {
            oldBrowser.prototype.createToolbar.call(this);

            var typeFilters = new media.view.AttachmentFilters.TypeFilter({
                controller: this.controller,
                model: this.collection.props,
                priority: -80
            });

            this.toolbar.set('typeFilter', typeFilters);

            var yearFilters = new media.view.AttachmentFilters.YearFilter({
                controller: this.controller,
                model: this.collection.props,
                priority: -70
            });

            this.toolbar.set('yearFilter', yearFilters);
        }
    });
});
