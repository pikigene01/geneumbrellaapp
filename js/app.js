var BlueUmbrella = "../images/Blueumbrella.png";
var PinkUmbrella = "../images/Pinkumbrella.png";
var YellowUmbrella = "../images/Yelloumbrella.png";
var upload_icon = "../images/upload_icon.svg";
var Loader = "../images/loader_icon.svg";
const colors = ["blue", "pink", "yellow"];
let color = "blue";
let logo = "";
let toggleUploadIcon = true;
let fileLoading = false;
let uploadButtonLoading = false;
let fileName = "";
let file = "";
let UploadIcon = upload_icon;
let counter = 0;
let gene_app_dom = "";

const dimensions = { height: 406, width: 451 };
const UmbrellaMapping = {
  blue: BlueUmbrella,
  pink: PinkUmbrella,
  yellow: YellowUmbrella,
};
const LoaderIcon = (fill, className) => {
  return `
    <svg
        class="${`Loader--${fill} ${className}`}"
        aria-hidden="true"
        ocusable="false"
        role="presentation"
        viewBox="0 0 28.3 31.2"
        width="28.3"
        height="31.2"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M25.1 23.6c-.3.1-.6.2-1 .2-.6.1-1.3 0-2.1.1s-1.7.3-2.6.8c-.8.5-1.4 1.1-1.9 1.6-.7.9-1.1 1.7-1.5 2.2-.2.3-.4.4-.7.6-.2.1-.4.2-.8.2v-13L26 22.9c-.3.3-.6.5-.9.7m-11.3 5.9c-.5-.1-.8-.2-1-.4-.2-.2-.5-.4-.7-.7-.3-.5-.7-1.1-1.2-1.7-.5-.7-1.1-1.3-2.1-1.9-.8-.5-1.6-.7-2.3-.8-1.1-.2-2-.1-2.7-.2l-.9-.3c-.2-.1-.4-.3-.6-.6l11.4-6.6v13.2zM1.7 21.3c0-.3.1-.6.2-1 .2-.5.6-1.1.9-1.9.3-.8.6-1.7.6-2.8v-.1c0-1.5-.6-2.6-1-3.5l-.6-1.2c-.1-.4-.2-.7-.2-1 0-.3.1-.6.2-1l11.4 6.6-11.3 6.8c-.1-.4-.2-.7-.2-.9M3.2 7.6c.3-.1.6-.2 1-.2.6-.1 1.3 0 2.1-.1.7-.2 1.6-.4 2.5-.9.8-.5 1.4-1.1 1.9-1.6.7-.9 1.1-1.7 1.5-2.2.2-.3.4-.4.7-.6.2-.1.5-.2.8-.2V15L2.3 8.3c.3-.4.6-.6.9-.7m11.3-5.9c.5 0 .8.2 1 .4.2.2.5.4.7.7.3.5.7 1.1 1.2 1.7.5.7 1.1 1.3 2.1 1.9.8.5 1.6.7 2.4.8 1.1.1 2 .1 2.7.2l.9.3c.2.1.4.3.6.6l-11.4 6.6V1.7zm12.1 8.2c0 .3-.1.6-.2 1-.2.5-.6 1.1-.9 1.9-.3.8-.6 1.7-.6 2.8v.2c0 1.5.5 2.6 1 3.5l.6 1.2c.1.4.2.7.2 1 0 .3-.1.6-.2.9l-11.4-6.6L26.3 9c.2.4.3.7.3.9m.4 7.8c-.3-.6-.5-1.3-.5-2v-.1c0-1 .4-1.8.8-2.7.2-.4.5-.8.6-1.3.2-.5.3-1 .3-1.6 0-.7-.2-1.4-.6-2.1-.5-.8-1.1-1.4-1.8-1.7-.5-.2-1-.3-1.5-.4-.7-.1-1.4-.1-2.1-.1-.7-.1-1.3-.2-1.9-.6-.6-.3-1-.7-1.4-1.2-.5-.9-.9-1.7-1.6-2.5-.3-.4-.7-.8-1.3-1-.5-.3-1.1-.4-1.9-.4-1 0-1.8.2-2.4.7-.5.3-.8.7-1.1 1.1-.4.6-.7 1.2-1.1 1.7-.4.5-.8 1-1.5 1.4-.6.4-1.2.5-1.8.6-.9.1-1.8 0-2.8.2-.5.1-1 .3-1.5.7-.5.3-.9.8-1.3 1.4C.2 8.5 0 9.3 0 10c0 .6.1 1.1.3 1.6.3.7.7 1.3 1 2 .3.6.5 1.3.5 2.1v.1c0 1.1-.4 1.8-.8 2.7-.2.4-.5.8-.6 1.3-.2.5-.3 1-.3 1.6 0 .7.2 1.4.6 2.1.5.8 1.1 1.4 1.8 1.7.5.2 1 .3 1.5.4.7.1 1.4.1 2.1.1.7.1 1.3.2 2 .6.6.3 1 .7 1.4 1.2.5.7.9 1.5 1.6 2.3.3.4.7.7 1.3 1 .5.3 1.2.4 1.9.4 1 0 1.8-.3 2.4-.7.5-.3.8-.7 1.1-1.1.4-.6.8-1.2 1.2-1.7.4-.5.8-1 1.5-1.4.6-.3 1.1-.5 1.7-.6.9-.1 1.8 0 2.8-.2.5-.1 1-.3 1.5-.6s.9-.8 1.3-1.4c.4-.7.6-1.5.6-2.1 0-.6-.1-1.1-.3-1.6-.5-.9-.8-1.5-1.1-2.1"></path>
    </svg>
    `;
};

const defaultOptions = {
  format: "image/png",
  quality: 0.92,
  width: undefined,
  height: undefined,
};

const mergeImages = (sources = [], options = {}) =>
  new Promise((resolve) => {
    options = Object.assign({}, defaultOptions, options);
    console.log(options)

    const canvas = window.document.createElement("canvas");
    const Image = window.Image;

    const images = sources.map(
      (source) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onerror = () => reject(new Error("Couldn't load image"));
          img.onload = () => resolve(Object.assign({}, source, { img }));
          img.src = source.src;
        })
    );

    // Get canvas context
    const ctx = canvas.getContext("2d");

    resolve(
      Promise.all(images).then((images) => {
        canvas.width = options.width;
        canvas.height = options.height;

        // Draw images to canvas
        images.forEach((image) => {
          if (image.logo) {
            return ctx.drawImage(
              image.img,
              canvas.width / 2 - image.x,
              canvas.height - image.y - 30,
              image.w,
              image.h
            );
          }

          return ctx.drawImage(
            image.img,
            image.x,
            image.y,
            canvas.width,
            canvas.height
          );
        });

        return canvas.toDataURL(options.format, options.quality);
      })
    );
  });


const UmbrellaComponent = (logo, color, toggleUploadIcon) => {
  let imageLoading = false;
  let src = UmbrellaMapping[color];

  const UmbrellaImageClass = classNames({
    ["Umbrella-image"]: true,
    ["d-none"]: imageLoading,
  });

  const LoaderClass = classNames({
    ["Umbrella-loading"]: imageLoading,
    ["d-none"]: !imageLoading,
  });

  // Merge Umbrella Image and Logo
  const updateUmbrellaLogo = () => {
    const width = dimensions.width * 0.25;
    const height = dimensions.height * 0.1;

    mergeImages(
      [
        { src: UmbrellaMapping[color], x: 0, y: 0 },
        {
          src: logo,
          x: width / 2.0,
          y: height,
          logo: true,
          h: height,
          w: width,
        },
      ],
      {
        height: dimensions.height,
        width: dimensions.width,
      }
    ).then((b64) => {
      src = b64;
    
      imageLoading = false;
      toggleUploadIcon = false;


      document.querySelector("#UmbrellaComponent").innerHTML = `
      <div class='Umbrella'>
    <img
        class="${UmbrellaImageClass}"
        src="${src}"
    />
    ${LoaderIcon(color, LoaderClass)}
   </div>
      `;
    });
  };

  // React.useEffect(() => {
  //oninputs change
  if (logo !== null) {
    toggleUploadIcon = true;
    imageLoading = true;
    setTimeout(updateUmbrellaLogo(), 3000);
  } else {
    src = UmbrellaMapping[color];
  }
  // }, [logo, color]);

  return `
    <div class='Umbrella'>
    <img
        class="${UmbrellaImageClass}"
        src="${src}"
    />
    ${LoaderIcon(color, LoaderClass)}
</div>
    `;
};

const CustomizeUmbrella = () => {
  document.addEventListener("DOMContentLoaded", () => {
    let UmbrellaClass = classNames({
      ["Row"]: true,
      [`Row--${color}`]: color,
    });
    let UploadIconClass = classNames({
      ["Upload-icon"]: true,
      ["Upload-icon-loading"]: fileLoading || uploadButtonLoading,
    });

    let UploadButtonClass = classNames({
      ["Upload-Button"]: true,
      [`Upload-Button--${color}`]: color,
    });

    let CloseIconClass = classNames({
      ["material-icons"]: true,
      ["Close-icon"]: true,
      ["Close-icon--visible"]: fileName !== "",
    });

    setInterval(()=>{
      
        document.querySelectorAll('.color_btn').forEach((btn)=>{
          btn.onclick = (e)=>{
            let targetValue = e.target.getAttribute('data-target');
            onChangeColor(targetValue);
            umbrellaUpdate();
            
          }
        });
    },1000);

    const onChangeColor = (umbrellaColor) =>{
      color = umbrellaColor;
      UmbrellaClass = classNames({
        ["Row"]: true,
        [`Row--${color}`]: color,
      });
      UmbrellaClass = classNames({
        ["Row"]: true,
        [`Row--${color}`]: color,
      });
      UploadButtonClass = classNames({
        ["Upload-Button"]: true,
        [`Upload-Button--${color}`]: color,
      });
    };
    

    const onChangeFile = (e) => {
      let fileAssign = e.target.files[0];
      e.target.value = null;

      fileLoading = true;
        fileName = fileAssign.name;
        fileLoading = false;
        file = URL.createObjectURL(fileAssign);
    };

    const onToggleUploadIcon = (loading) => {
      uploadButtonLoading = loading;
    };

    const onRemoveLogo = () => {
      file = null;
      fileName = "";
    };

    const onUploadLogo = () => {
      if (uploadButtonLoading || fileLoading) return () => {};

      document.querySelectorAll("#inputFile").forEach((input) => {
        input.click();
        input.addEventListener("change", (e) => {
          onChangeFile(e);
          umbrellaUpdate();
        });
      });
    };
    const umbrellaUpdate = () => {
      document.querySelector(".App-header").innerHTML = `
    <div class="${UmbrellaClass}">
    <div class='Col Col--6 Col--s-12 Col--xs-12' id="UmbrellaComponent">
        ${UmbrellaComponent(file, color, onToggleUploadIcon)}
    </div>
    <div class='Col Col--6 Col--s-12 Col--xs-12'>
        <div class='Info-wrapper'>
            <h2 class='Heading'>Customize your Umbrella</h2>
            <div id="color_wrapper">
            ${ColorButtons(color,onChangeColor)}
            </div>
            <p class='Text Text--strong'>Customize your umbrella</p>
            <p class='Text Text--subtle'>Upload a logo for an instant preview</p>
            <p class='Text Text--small Text--subtle'>.png and .jpg file only. Max file size is 5MB.</p>
            <div class='Upload'>
                <input
                    type="file"
                    onchange="${onChangeFile}"
                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                    style="display:none;"
                    id="inputFile"
                />
                <div id="UPLOAD_BTN" class="${UploadButtonClass}" >
                    <img
                        src="${
                          fileLoading || uploadButtonLoading
                            ? Loader
                            : UploadIcon
                        }"
                        class="${UploadIconClass}"
                         />
                    <p class='Text--strong Text--ellipsis' style="cursor:pointer;" >${
        fileName ? fileName : "UPLOAD LOGO"
      }</p>
                    <div class='Upload-close'>
                        <i class="${CloseIconClass}" onclick="${onRemoveLogo()}">close</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `;

      document.querySelector("#UPLOAD_BTN").addEventListener("click", () => {
        onUploadLogo();
      });
    };
    umbrellaUpdate();
  });
};

const ColorButtons = (color,onChangeColor) => {
    const getColorButtonClass = (umbrellaColor) => {
      return classNames({
        ["Color-swatch"]: true,
        [`Color-swatch--${umbrellaColor}`]: umbrellaColor,
        [`Color-active--${color}`]: color === umbrellaColor,
      });
    };
let htmlData = "";

    colors.map((umbrellaColor) => {
        htmlData += `
                  <span
                  id="color_click_${umbrellaColor}"
                  class="${getColorButtonClass(umbrellaColor)} color_btn"
                  data-target="${umbrellaColor}"
              >
              </span>
                  `;
    });
    return `
          <div class='Swatch'>
              ${htmlData}
          </div>
      `;
// });
};

const getApp = () => {
  let appText = `
<div class="App">
<header class="App-header">
  ${CustomizeUmbrella()}
</header>
</div>
`;
  gene_app_dom = appText;
};

getApp();
document.querySelector("#gene_app").innerHTML = gene_app_dom;
