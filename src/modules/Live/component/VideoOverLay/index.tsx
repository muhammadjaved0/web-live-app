import ChatBox from "../ChatBox/index";
import EyeIcon from "../EyeIcon/EyeIcon";
const VideoOverLay = ({ children }: any) => {
  return (
    <>
      <div>
        <div style={{ marginLeft: "20px" }}>
          <div style={{ position: "absolute", top: "50px", zIndex: 1 }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  display: "flex",
                  background: "#00000080",
                  borderRadius: "8px",
                  padding: "4px",
                }}
              >
                <img
                  src="https://www.icolorpalette.com/download/solidcolorimage/02ccfe_solid_color_background_icolorpalette.png"
                  width={32}
                  height={32}
                  style={{
                    borderRadius: "50%",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                />
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    marginLeft: "4px",
                    marginRight: "4px",
                    color: "white",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  WaqasAhmad0099
                </h3>
              </div>
              <button
                style={{
                  background: "#FF3B30",
                  padding: "6px 18px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: 700,
                  marginTop: "12px",
                  marginBottom: "12px",
                }}
              >
                Live
              </button>
            </div>
            <div
              style={{
                display: "flex",
                background: "#00000080",
                borderRadius: "8px",
                padding: "4px",
                width: "fit-content",
                marginTop: "8px",
              }}
            >
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 400,
                  marginLeft: "4px",
                  color: "white",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                800,000 rates
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                background: "#00000080",
                borderRadius: "8px",
                padding: "4px",
                width: "fit-content",
                marginTop: "8px",
              }}
            >
              <EyeIcon />
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 400,
                  marginLeft: "6px",
                  color: "white",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                2,232
              </h3>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 20, zIndex: 1 }}>
            <ChatBox
              name="kimmypossible"
              image="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
              message="Wow cool post thanks for sharing!"
            />
            <ChatBox
              name="grigoriy51"
              image="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
              message="Such shot, many lines, so
          fabulous. Found myself staring
          at it for minutes."
            />
          </div>
        </div>

        {children}
      </div>
    </>
  );
};

export default VideoOverLay;
