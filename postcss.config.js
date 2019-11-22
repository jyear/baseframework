module.exports = {
    plugins: [
        require("autoprefixer")({
            browsers: [
                "defaults",
                "not ie < 8",
                "last 30 versions",
                "> 1%",
                "iOS 7",
                "last 5 iOS versions",
                "android >= 4.0"
            ]
        })
    ]
};
