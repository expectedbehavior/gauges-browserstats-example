var gulp = require('gulp');

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');
    var browserslist = require('browserslist');

    // first, let's make a file with the default autoprefixer setting
    gulp.src('./input/*.css')
            .pipe(postcss([ autoprefixer({
                browsers: ['last 2 versions'] // Default setting
            }) ]))
            .pipe(gulp.dest('./default-output'));

    // select browsers from the Gaug.es browserstats.json
    var browsers = browserslist('> 1% in my stats', { stats: 'browserstats.json' })

    //let's try it with our customized browser list
    return gulp.src('./input/*.css')
        .pipe(postcss([ autoprefixer({
        	browsers: browsers // Use the selected browsers
        }) ]))
        .pipe(gulp.dest('./real-life-output'));
});

// fetch latest browserstats from Gauges
gulp.task('gauges', function () {
    var request = require('request');
    var gutil = require('gulp-util');
    var source = require('vinyl-source-stream')

    var api_key = gutil.env.api_key;
    var site_id = gutil.env.site_id;

    // let's get the stats for last month, so we have a full months worth of data
    var date = new Date();
    date.setDate(1); // first day
    date.setMonth(date.getMonth()-1); // go back a month
    var date_string = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString();
    console.log(date_string)
    return request({
            url: 'https://secure.gaug.es/gauges/' + site_id + '/browserstats',
            qs: {
                'date': date_string
            },
            headers: {
                'X-Gauges-Token': api_key
            }
        })
        .pipe(source('browserstats.json'))
        .pipe(gulp.dest('./'));
});
