<?php
/**
 * Plugin Name: Media Library Custom Filters
 * Description: тест.
 * Version: 1.0
 * Author: Тестовое
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_enqueue_scripts', function($hook) {
    if ($hook !== 'upload.php') {
        return;
    }

    wp_enqueue_script(
        'media-library-custom-filters',
        plugin_dir_url(__FILE__) . 'assets/custom.js',
        ['jquery', 'media-views'],
        '1.0',
        true
    );
});

add_filter('ajax_query_attachments_args', function($query) {
    if (!current_user_can('upload_files')) {
        return $query;
    }

    if (!empty($_REQUEST['typeFilter'])) {
        $query['post_mime_type'] = sanitize_text_field($_REQUEST['typeFilter']);
    }

    if (!empty($_REQUEST['yearFilter'])) {
        $query['date_query'][] = [
            'year' => intval($_REQUEST['yearFilter'])
        ];
    }

    return $query;
});

add_action('load-upload.php', function() {
    add_action('admin_head', function() {
        if (isset($_GET['mode']) && $_GET['mode'] === 'list') {
            echo '<style>
                .tablenav.top .actions select.attachment-filters { display: none; }
            </style>';
        }
    });
});
