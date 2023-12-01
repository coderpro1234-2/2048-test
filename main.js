var score = 0
var highscore = ""
function getGameData() {
  if ((document.cookie).includes("gdata=")) {
    e = 0
    wr = false
    textdata = ""
    while (e < ((document.cookie).length)+1) {
      if (wr) {
        textdata += (document.cookie)[e]
      }
      if ((document.cookie)[e] == ";") {
        wr = false
        e = (document.cookie).length-1
      }
      if ((document.cookie)[e] == "=") {
        wr = true
      }
      e ++
    }
    datalist = textdata.split("$")
    console.log(datalist)
    highscore = parseInt(datalist[0])
    score = parseInt(datalist[1])
    i = 0
    c = 2
    cc = 0
    while (i < 4) {
      i2 = 0
      while (i2 < 4) {
        if (datalist[c] == 0) {
          document.getElementById("block_"+i+i2).innerHTML = "&nbsp;"
          cc ++
        }
        else {
          document.getElementById("block_"+i+i2).innerHTML = datalist[c]
        }
        
        i2++
        c++
      }
      i++
    }
    if (cc == 16) {
      RNGBlock(true)
      RNGBlock(true)
    }
    document.getElementById("highscore").innerHTML = "High Score: "+highscore
    encodeGameData(highscore, score)
  }
  else {
    highscore = 0
    encodeGameData(0,0)
    document.getElementById("highscore").innerHTML = "High Score: "+highscore
    RNGBlock(true)
    RNGBlock(true)
  }
}
function encodeGameData(hscore, score) {
  tmpstr = hscore+"$"+score+"$"
  i = 0
  while (i < 4) {
    i2 = 0
    while (i2 < 4) {
      if (document.getElementById("block_"+i+i2).innerHTML == "&nbsp;") {
        tmpstr += "0$"
      }
      else {
        tmpstr += document.getElementById("block_"+i+i2).innerHTML+"$"
      }
      
      i2++
    }
    i++
  }
  document.cookie = "gdata="+tmpstr+"; expires="+new Date(((Date.now()/1000) + 320000000)*1000).toUTCString()
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function addBlock(data, x, y) {
  document.getElementById("block_"+y+x).innerHTML = data
}
function addRandBlock(data) {
  x = getRndInteger(0,3)+""+getRndInteger(0,3)
  if (document.getElementById("block_"+x).innerHTML == "&nbsp;") {
    addBlock(data, x[1], x[0])
  }
  else {
    addRandBlock(data)
  }
}
function RNGBlock(f) {
  if (checkded() && !f) {
    return;
  }
  if (getRndInteger(1,10) == 1) {
    addRandBlock(4)
  }
  else {
    addRandBlock(2)
  }
}
function moveBlock(bx, by, x, y, c) {
  to = document.getElementById("block_"+by+bx).innerHTML
  if (to == "&nbsp;") {
    return
  }
  if (y == 0) {
    if (x > 0) {
      tx = bx
      r = true
      while (r) {
        tx ++
        if (tx > 3) {
          if (tx-1 == bx) {
            return
          }
          tx --
          document.getElementById("block_"+by+tx).innerHTML = to
          document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
          r = false
        }
        else if (!(document.getElementById("block_"+by+tx).innerHTML == "&nbsp;")) {
          if (document.getElementById("block_"+by+tx).innerHTML == to) {
            document.getElementById("block_"+by+tx).innerHTML = parseInt(to)*2
            if (!c) {
              score += parseInt(to)*2
            }
            document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
            moveBlock(tx, by, x, y, c)
            r = false
          }
          else {
            if (tx-1 == bx) {
              return
            }
            tx --
            document.getElementById("block_"+by+tx).innerHTML = to
            document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
            r = false
          }
        }
      }
    }
    else if (x < 0) {
      tx = bx
      r = true
      while (r) {
        tx --
        if (tx < 0) {
          if (tx+1 == bx) {
            return
          }
          tx ++
          document.getElementById("block_"+by+tx).innerHTML = to
          document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
          r = false
        }
        else if (!(document.getElementById("block_"+by+tx).innerHTML == "&nbsp;")) {
          if (document.getElementById("block_"+by+tx).innerHTML == to) {
            document.getElementById("block_"+by+tx).innerHTML = parseInt(to)*2
            if (!c) {
              score += parseInt(to)*2
            }
            document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
            moveBlock(tx, by, x, y, c)
            r = false
          }
          else {
            if (tx+1 == bx) {
              return
            }
            tx ++
            document.getElementById("block_"+by+tx).innerHTML = to
            document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
            r = false
          }
        }
      }
    }
  }
  else {
    if (y > 0) {
      ty = by
      r = true
      while (r) {
        ty ++
        if (ty > 3) {
          if (ty-1 == by) {
            return
          }
          ty --
          document.getElementById("block_"+ty+bx).innerHTML = to
          document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
          r = false
        }
        else if (!(document.getElementById("block_"+ty+bx).innerHTML == "&nbsp;")) {
          if (document.getElementById("block_"+ty+bx).innerHTML == to) {
            document.getElementById("block_"+ty+bx).innerHTML = parseInt(to)*2
            if (!c) {
              score += parseInt(to)*2
            }
            document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
            moveBlock(bx, ty, x, y, c)
            r = false
          }
          else {
            if (ty-1 == by) {
              return
            }
            ty --
            document.getElementById("block_"+ty+bx).innerHTML = to
            document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
            r = false
          }
        }
      }
    }
    else if (y < 0) {
      ty = by
      r = true
      while (r) {
        ty --
        if (ty < 0) {
          if (ty+1 == by) {
            return
          }
          ty ++
          document.getElementById("block_"+ty+bx).innerHTML = to
          if (!(ty == by)) {
            document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
          }
          r = false
        }
        else if (!(document.getElementById("block_"+ty+bx).innerHTML == "&nbsp;")) {
          if (document.getElementById("block_"+ty+bx).innerHTML == to) {
            document.getElementById("block_"+ty+bx).innerHTML = parseInt(to)*2
            if (!c) {
              score += parseInt(to)*2
            }
            document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
            moveBlock(bx, ty, x, y, c)
            r = false
          }
          else {
            if (ty+1 == by) {
              return
            }
            ty ++
            document.getElementById("block_"+ty+bx).innerHTML = to
            document.getElementById("block_"+by+bx).innerHTML = "&nbsp;"
            r = false
          }
        }
      }
    }
  }
}
function settmp() {
  i = 0
  while (i < 4) {
    i2 = 0
    while (i2 < 4) {
      document.getElementById("tmp_"+i+i2).innerHTML = document.getElementById("block_"+i+i2).innerHTML
      i2++
    }
    i++
  }
}
function comparetmp() {
  same = true
  i = 0
  while (i < 4) {
    i2 = 0
    while (i2 < 4) {
      if (!(document.getElementById("tmp_"+i+i2).innerHTML == document.getElementById("block_"+i+i2).innerHTML)) {
        same = false
        return same
      }
      i2++
    }
    i++
  }
  return same
}
function setwft() {
  i = 0
  while (i < 4) {
    i2 = 0
    while (i2 < 4) {
      document.getElementById("block_"+i+i2).innerHTML = document.getElementById("tmp_"+i+i2).innerHTML
      i2++
    }
    i++
  }
}
function checkded() {
  settmp()
  movestat(1, true)
  if (comparetmp()) {
    movestat(2, true)
    if (comparetmp()) {
      movestat(3, true)
      if (comparetmp()) {
        movestat(4, true)
        if (comparetmp()) {
          return true;
        }
      }
    }
  }
  setwft()
  return false;
}
function setcolor() {
  i = 0
  while (i < 4) {
    i2 = 0
    while (i2 < 4) {
      if (parseInt(document.getElementById("block_"+i+i2).innerHTML) != "NaN") {
        if (parseInt(document.getElementById("block_"+i+i2).innerHTML) > 4) {
          document.getElementById("block_"+i+i2).style.color = "#f9f6f2"
        }
        else {
          document.getElementById("block_"+i+i2).style.color = "#776e65"
        }
      }
      if (document.getElementById("block_"+i+i2).innerHTML == "&nbsp;") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#cdc1b4"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "2") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#eee4da"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "4") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#eee1c9"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "8") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#f3b27a"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "16") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#f59563"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "32") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#f77c5f"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "64") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#f65e3b"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "128") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#edd073"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "256") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#edcc62"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "512") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#edc950"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "1024") {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#edc53f"
      }
      else if (document.getElementById("block_"+i+i2).innerHTML == "2048"){
        document.getElementById("block_"+i+i2).style.backgroundColor = "#edc22e"
      }
      else {
        document.getElementById("block_"+i+i2).style.backgroundColor = "#ebb914"
      }
      i2++
    }
    i++
  }
}
function updatescreen() {
  setcolor()
  if (checkded()) {
    document.getElementById("highscore").innerHTML = "You Died"
    return;
  }
  document.getElementById("score").innerHTML = "Score: "+score
  if (score > highscore) {
    highscore = score
    encodeGameData(score, score)
  }
  document.getElementById("highscore").innerHTML = "High Score: "+highscore
}
function movestat(dir, c) {
  if (!c) {
    if (checkded()) {
      return;
    }
  }
  if (!c) {
    settmp()
  }
  if (dir == 1) {
    j = 0
    while (j < 4) {
      j2 = 0
      while (j2 < 4) {
        moveBlock(j2, j, 0, -1, c)
        j2++
      }
      j++
    }
  }
  else if (dir == 2) {
    j = 0
    while (j < 4) {
      j2 = 0
      while (j2 < 4) {
        moveBlock(3-j, j2, 1, 0, c)
        j2++
      }
      j++
    }
  }
  else if (dir == 3) {
    j = 0
      while (j < 4) {
        j2 = 0
        while (j2 < 4) {
          moveBlock(j2, 3-j, 0, 1, c)
          j2++
        }
        j++
      }
  }
  else if (dir == 4) {
    j = 0
      while (j < 4) {
        j2 = 0
        while (j2 < 4) {
          moveBlock(j, j2, -1, 0, c)
          j2++
        }
        j++
      }
  }
  if (!c) {
    if (!comparetmp()) {
      RNGBlock(false)
      encodeGameData(highscore, score)
      document.getElementById("highscore").innerHTML = "High Score: "+highscore
    }
    updatescreen()
    if (checkded()) {
      updatescreen()
      document.cookie = "gdata="+highscore+"$0$0$0$0$0$0$0$0$0$0$0$0$0$0$0$0$0$0; expires="+new Date(((Date.now()/1000) + 320000000)*1000).toUTCString()
    }
  }
}
function resetscore() {
  document.cookie = "highscore = username=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
  score = 0
  highscore = 0
  i = 0
  while (i < 4) {
    i2 = 0
    while (i2 < 4) {
      document.getElementById("block_"+i+i2).innerHTML = "&nbsp;"
      i2++
    }
    i++
  }
  RNGBlock(true)
  RNGBlock(true)
  encodeGameData(0,0)
  document.getElementById("score").innerHTML = "Score: "+score
  document.getElementById("highscore").innerHTML = "High Score: "+highscore
  encodeGameData(0,0)
}
function resetbutton() {
  i = 0
  while (i < 4) {
    i2 = 0
    while (i2 < 4) {
      document.getElementById("block_"+i+i2).innerHTML = "&nbsp;"
      i2++
    }
    i++
  }
  RNGBlock(true)
  RNGBlock(true)
  score = 0
  encodeGameData(highscore, score)
  document.getElementById("score").innerHTML = "Score: "+score
  document.getElementById("highscore").innerHTML = "High Score: "+highscore
  setcolor()
  updatescreen()
}
window.onload = function(){
  if ((document.cookie).includes("username")) {
    resetscore()
  }
  getGameData()
  setcolor()
  updatescreen()
  document.addEventListener("keydown", function(event){
    if (event.key == "ArrowUp" || event.key == "w" || event.key == "W") {
      movestat(1, false)
    }
    if (event.key == "ArrowDown" || event.key == "s" || event.key == "S") {
      movestat(3, false)
    }
    if (event.key == "ArrowLeft" || event.key == "a" || event.key == "A") {
      movestat(4, false)
    }
    if (event.key == "ArrowRight" || event.key == "d" || event.key == "D") {
      movestat(2, false)
    }
  })
}