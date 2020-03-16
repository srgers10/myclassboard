var video;
var socket;
var displayMediaOptions = {
  video: {
    cursor: "always"
  },
  audio: false
};
var btn_startCapture;
var chk_isTeacher;

function setup(){
  canvas = createCanvas(320, 240);
  background(51);


  socket = io.connect("https://mysterious-depths-46842.herokuapp.com/")
  socket.on('stream-out', renderStream)
  console.log("Connected!");


  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  img = loadImage("buffer.jpg")

  btn_startCapture = createButton("Share Screen");
  btn_startCapture.mousePressed(startCapture)
  chk_isTeacher = createCheckbox("Stream", false)
}
function draw() {
  try{
    image(video, 0,0)
  }catch(err) {
    console.error("Error: " + err);
  }

  if(chk_isTeacher.checked())
    socket.emit('stream-in', canvas.elt.toDataURL('image/webp'));
}

function renderStream(data){
  document.getElementById("stream_img").src = data
}

async function startCapture() {
  try {
    video.elt.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    //dumpOptionsInfo();
    console.log("Starting Capture")
  } catch(err) {
    console.error("Error: " + err);
  }
}

function stopCapture(evt) {
  let tracks = video.srcObject.getTracks();

  tracks.forEach(track => track.stop());
  video.srcObject = null;
}
