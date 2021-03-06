module.exports = function(grunt) {

    var country = grunt.option('country'),
        size = grunt.option('size') || 'default',
        files = [
            'css/payment-methods.css', 
            'css/countries/' + country + '/payment-methods.css'
        ],
        sizeCollection = size.split(','),
        destination = 'build/payment-methods.' + country + '__' + size + '.css'


    sizeCollection.forEach(function (e) {
        files.push('css/countries/' + country + '/' + e + '/payment-methods.css');
    });

    if (sizeCollection.length > 1) {
        // Rename file when all sizes
        destination = destination.replace(size, 'all');
    }

    // Project configuration.
    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),
        'concat': {

            'build': {                
                'src': files,
                'dest': destination
            }
        },

        'copy': {
            'main': {
                'files': [{
                    'expand': true,

                    // Source folder
                    'cwd': 'build/',
                    
                    // Source files
                    'src': ['payment-methods.' + country + '__default.css'],
                    
                    // Destination folder
                    'dest': 'dist/',

                    'rename': function (dest, src) {
                        return dest + src.replace(/__default/, '');
                    }
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', []);
    grunt.registerTask('build', ['concat']);
    grunt.registerTask('dist', ['build', 'copy']);

};