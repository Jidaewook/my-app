const sizes = {
    // global sizes
    zero: 0,
    base: 16,
    font: 14,
    radius: 6,
    padding: 25,
  
    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,
    title: 22,
    subTitle: 18,
    header: 16,
    body: 14,
    caption: 12,
    bottom: 10,
    profilePic: 80,
    profileAvatar: 60,
    profileCir: 130,

    // blank Height
    headerTop: 40,
    sideLine: 20,
    Input: 60,
    buttonWidth: 100,
    buttonHeight: 30,
    bigBtnHeight: 60,
    d1: 15,
    footerHeight: 150,
    


  };
  
  const fonts = {
    h1: {
      fontSize: sizes.h1,
      fontWeight: 'bold'
    },
    h2: {
      fontSize: sizes.h2
    },
    h3: {
      fontSize: sizes.h3
    },
    h4: {
        fontSize: sizes.h4
    },
    h5: {
        fontSize: sizes.h5
    },
    h6: {
      fontSize: sizes.h6,

    },
    header: {
      fontSize: sizes.header
    },
    title: {
      fontSize: sizes.title,
      fontWeight: 'bold'
    },
    body: {
      fontSize: sizes.body
    },
    caption: {
      fontSize: sizes.caption
    },
    subTitle: {
      fontSize: sizes.subTitle, 
    },
    settingSectionAnd: {
      fontFamily: "Avenir"    
    }, 
    settingSectionAnd: {
      fontFamily: "Roboto"    
    }, 
    
  };

  const colors = {
    white: '#FFF',
    primary: '#52c0b4', //민트계열
    gray: '#908e8c', 
    light: '#f9f9f4',
    accent: "#F3534A", //빨간계열
    secondary: "#2BDA8E", //밝은연두
    tertiary: "#FFE358", //연노랑
    black: "#323643",
    purple: '#f58084', //연분홍

    gray1: '#525252',
    gray2: '#787878',
    gray3: '#a6a6a6',
    gray4: '#cccccc',
    gray5: '#e0e0e0',
    gray6: '#F5F5F8',

    main1: '#e14dff',  //보라계열
    main2: '#d91cff',
    main3: '#a308c2',
    main4: '#560666',

    aquablue: '#468cf0',
    buttonBlue: '#91bdfa'

}
  
  export { sizes, fonts, colors };