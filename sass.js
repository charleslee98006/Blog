exports.task = {
  dist: {
    // options: {
    //   style: 'expanded',
    //   lineNumbers: true, // 1
    //   sourcemap: 'none'
    // },
    files: [{
      expand: true,
      cwd: 'public/',
      src: ['/**/*.scss'],
      dest: 'public/styles/styles.css'
      // ext: '.css'
    }]
  }
};