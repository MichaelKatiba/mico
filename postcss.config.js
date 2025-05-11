module.exports = (ctx) => ({
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 2,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true
      },
      // Important: Don't preserve original declarations to avoid duplicates
      preserve: false
    }),
    ctx.env === 'production' ? require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        // Enable proper whitespace normalization for minification
        normalizeWhitespace: true,
        // Disable calc optimization to avoid errors
        calc: false,
        // Merge duplicate rules
        mergeRules: true,
        // Remove duplicate properties
        discardDuplicates: true
      }]
    }) : false,
    require('autoprefixer')
  ]
});
