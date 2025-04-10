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
