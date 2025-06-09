//之前博客的serviceWorker可能残留在访问过的用户浏览器中，清理很麻烦，所以在这里加个校验帮用户清理
if ("serviceWorker" in navigator) {
  console.log("has sw");
  navigator.serviceWorker.getRegistrations().then((reg) => {
    for (const registration of reg) {
      registration.unregister().then(() => {
        console.log("sw unregistered");
      });
    }
  }).catch((err)=>{
    console.log("sw unregister err:",err);
  })
}
