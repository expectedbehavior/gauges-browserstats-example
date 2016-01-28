# How to prefix your CSS based on real life browser stats

TODO: add better description and instructions

## Setup
```
npm install
```

## Autoprefix your CSS
```
gulp autoprefixer
```
This generates two files. The default CSS created by autoprefixer:
https://github.com/expectedbehavior/gauges-browserstats-example/blob/master/default-output/example.css

And a CSS file that is customized to the your website's real life borwser stats:
https://github.com/expectedbehavior/gauges-browserstats-example/blob/master/real-life-output/example.css

## Download latest browserstats.json from Gauges
```
gulp --api_key=KEY_GOES_HERE --site_id=SITE_ID_GOES_HERE gauges
```
