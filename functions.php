<?php
define('IS_DEVELOPMENT', true); // Fejlesztői mód bekapcsolása

function enqueue_vite_assets() {
    if (IS_DEVELOPMENT) {
        // Development mode - Vite dev server
        wp_enqueue_script('vite-client', 'http://localhost:5173/@vite/client', [], null);
        wp_enqueue_script('vite-main', 'http://localhost:5173/src/main.js', [], null);
    } else {
        // Production mode - Built assets
        $css_file = get_template_directory() . '/dist/css/style.css';
        $js_file = get_template_directory() . '/dist/js/main.js';

        if (file_exists($css_file)) {
            wp_enqueue_style(
                'wp-vue-styles',
                get_template_directory_uri() . '/dist/css/style.css',
                [],
                filemtime($css_file)
            );
        }

        if (file_exists($js_file)) {
            wp_enqueue_script(
                'wp-vue-main',
                get_template_directory_uri() . '/dist/js/main.js',
                [],
                filemtime($js_file),
                true
            );
        }
    }

    // WordPress API URL átadása a JavaScript-nek
    wp_localize_script(
        IS_DEVELOPMENT ? 'vite-main' : 'wp-vue-main',
        'wpSettings',
        array(
            'apiUrl' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest')
        )
    );
}
add_action('wp_enqueue_scripts', 'enqueue_vite_assets');

// CORS engedélyezése
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: *");
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        status_header(200);
        exit();
    }
});

// REST API debug info
add_action('rest_api_init', function() {
    register_rest_field('post', 'debug_info', array(
        'get_callback' => function($post) {
            return array(
                'request_time' => current_time('mysql'),
                'post_id' => $post['id']
            );
        }
    ));
});