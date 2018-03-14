//引入工具包，格式为var name = require('node_modules里对应模块')
var gulp = require('gulp'),//本例安装的gulp包
	less = require('gulp-less'),//编译less文件的模块
	notify = require('gulp-notify'),//异常提示信息
	plumber = require('gulp-plumber'),//处理异常而不中断watch事件模块
	concat = require('gulp-concat'),//合并文件模块
	rename = require('gulp-rename')
	minicss = require('gulp-minify-css')//压缩css模块


//自定义任务
gulp.task('testLess',function(){
	gulp.src('less/*.less')//该任务针对的文件（less文件下的所有.less文件）
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(less())//当前任务所调用的模块
		.pipe(concat('stylesheet.css'))//合并css文件并重命名为stylesheet
		.pipe(gulp.dest('css/'))//在css文件夹生成的css文件
		.pipe(rename({suffix:'-min'}))//修改文件名
		.pipe(minicss())//压缩文件
		.pipe(gulp.dest('css/'));//在css文件夹生成的-min.css文件
})

gulp.task('testWatch',function(){
	gulp.eatch('less/*.less',['testLess']);//监听less文件夹下的所有less的文件，当发生改变时调用的testLess任务
})

//默认任务
gulp.task('default',['testLess']);//当执行gulp会调用default任务里的所有任务（‘testLess’）


