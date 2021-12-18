const interval = setInterval(() => {
  const header = document.querySelector('._3auIg, ._1QUKR')
  if (header) {
    clearInterval(interval)
    let darkModeEnabled = window.localStorage.getItem('whatsapp-darkmode')
    let speedAudio = window.localStorage.getItem('whatsapp-speed-audio')
    
    if (darkModeEnabled === undefined || darkModeEnabled === null) {
      window.localStorage.setItem('whatsapp-darkmode', false)
      darkModeEnabled = 'false'
    }

    if (speedAudio === undefined || speedAudio === null) {
      window.localStorage.setItem('whatsapp-speed-audio', false)
      speedAudio = 'false'
    }

    const btn = document.createElement('button')
    btn.innerHTML = '2X'
    btn.classList.add('twoTimes')
    header.appendChild(btn)

    var conversas = document.querySelectorAll('._2wP_Y > div')
    conversas.forEach((e) => {
      e.addEventListener('click', () => {
        if (speedAudio === 'true') {
          enableSpeed()
        } else {
          disableSpeed()
        }
      })
    })

    const rateChangeListener = (e) => {
      const audio = e.target
      console.log(audio.playbackRate)
      if (audio.playbackRate === 1 && speedAudio === 'true') {
        audio.playbackRate = 2
      }
    }

    const enableSpeed = () => {
      speedAudio = 'true'
      window.localStorage.setItem('whatsapp-speed-audio', true)
      let buscouAudio = 0
      const intervalAudios = setInterval(()=>{        
        console.log(buscouAudio)
        const audios = document.querySelectorAll('audio')
        buscouAudio++
        if (audios) {
          audios.forEach((audio) => {
            audio.playbackRate = 2
            audio.addEventListener('ratechange', rateChangeListener)
          })
          buscouAudio = 0
          clearInterval(intervalAudios)
        }

        if (!audios && buscouAudio === 20) {
          buscouAudio = 0
          clearInterval(intervalAudios)          
        }
      }, 300)
    }

    const disableSpeed = () => {
      speedAudio = 'false'
      window.localStorage.setItem('whatsapp-speed-audio', false)
      const audios = document.querySelectorAll('audio')
      audios.forEach((audio) => {
        audio.playbackRate = 1
        audio.removeEventListener('ratechange', rateChangeListener)
      })
    }

    btn.addEventListener('click', (e) => {
      if (speedAudio === 'false') {
        e.target.style.cssText = 'border:1px solid red'
        enableSpeed()
      } else {
        e.target.style.cssText = ''
        disableSpeed()
      }
    })

    const dark = document.createElement('label')
    const darkInputCheck = document.createElement('input')
    const slider = document.createElement('span')
    slider.classList.add('slider')
    slider.classList.add('round')    
    darkInputCheck.type = 'checkbox'
    dark.appendChild(darkInputCheck)    
    if (darkModeEnabled === "true") {
      document.body.classList.add('dark')
      darkInputCheck.checked = true
    }

    darkInputCheck.addEventListener('change', (e)=> {
      console.log(e)
      if (e.target.checked) {
        window.localStorage.setItem('whatsapp-darkmode', true)
        document.body.classList.add('dark')
      }

      if (!e.target.checked) {
        window.localStorage.setItem('whatsapp-darkmode', false)
        document.body.classList.remove('dark')
      }
    })

    dark.appendChild(slider)
    dark.classList.add('dark_mode_switch')
    header.appendChild(dark)


  }
}, 100)

console.log("NITRO WHATSAPP!!")
