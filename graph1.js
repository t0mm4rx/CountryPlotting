const WIDTH = 1300
const HEIGHT = 800
const MARGIN = 150

const AXES_COLOR = 150
const AXES_WEIGHT = 3

const GRADUATIONS_COLOR = 100
const GRADUATIONS_MARGIN = 40

const ARROW_SIZE = 10
const ARROW_MARGIN = 50

const FLAG_SIZE = 25

const HORIZONTAL_AXE_TITLE = "Gallup indice"
const VERTICAL_AXE_TITLE = "Happiness out of 10"
const AXE_TITLE_COLOR = 100
const AXE_TITLE_MARGIN = 90
const AXE_TITLE_SIZE = 20

const VERTICAL_RES = 10
const HORIZONTAL_RES = 12

const GRID_WEIGHT = .5
const GRID_COLOR = 170

/*
const data = [
  {
    x: 1,
    y: 2,
    country: 'fr'
  },
  {
    x: 3,
    y: 17,
    country: 'us'
  },
  {
    x: 5,
    y: 31,
    country: 'de'
  },
  {
    x: 5,
    y: 35,
    country: 'gb'
  },
  {
    x: 8,
    y: 37,
    country: 'ru'
  },
  {
    x: 8.5,
    y: 36,
    country: 'in'
  },
  {
    x: 9,
    y: 38,
    country: 'de'
  },
  {
    x: 11,
    y: 36,
    country: 'kw'
  }
]
*/

const images = []

function preload()
{

  for (var p of data)
  {
    images.push({
      im: loadImage('flags/' + p.code + '.png'),
      country: p.code
    })
  }

}

function setup()
{

  createCanvas(WIDTH, HEIGHT)
  fill(200)
  noStroke()
  rect(0, 0, width, height)

  /*var mask = createGraphics(Math.floor(FLAG_SIZE * 550 / 367), FLAG_SIZE)
  mask.background(0)
  mask.fill(255)
  mask.ellipseMode(RADIUS)
  mask.ellipse(mask.width / 2, mask.height / 2, FLAG_SIZE / 2, FLAG_SIZE / 2)
  var maskImage = graphics_to_image(mask)*/

  let origin = [MARGIN, height - MARGIN]
  let p1 = [origin[0], MARGIN]
  let p2 = [width - MARGIN, origin[1]]

  fill(AXES_COLOR)
  ellipseMode(CENTER, CENTER)

  // Vertical axe
  stroke(AXES_COLOR)
  strokeWeight(AXES_WEIGHT)
  line(origin[0], origin[1], p1[0], p1[1] - ARROW_MARGIN)

  // Horizontal axe
  line(origin[0], origin[1], p2[0] + ARROW_MARGIN, p2[1])

  // Top arrow
  line(p1[0], p1[1] - ARROW_MARGIN, p1[0] - ARROW_SIZE, p1[1] - ARROW_MARGIN + ARROW_SIZE)
  line(p1[0], p1[1] - ARROW_MARGIN, p1[0] + ARROW_SIZE, p1[1] - ARROW_MARGIN + ARROW_SIZE)

  // Bottom arrow
  line(p2[0] + ARROW_MARGIN, p2[1], p2[0] - ARROW_SIZE + ARROW_MARGIN, p2[1] - ARROW_SIZE)
  line(p2[0] + ARROW_MARGIN, p2[1], p2[0] - ARROW_SIZE + ARROW_MARGIN, p2[1] + ARROW_SIZE)

  fill(AXE_TITLE_COLOR)
  textFont('PT Mono')
  textSize(AXE_TITLE_SIZE)
  textAlign(CENTER, CENTER)
  noStroke()

  textStyle(BOLD)
  // Vertical axe name
  push()
  translate(origin[0] - AXE_TITLE_MARGIN, height / 2)
  rotate(-1/2 * PI)
  text(VERTICAL_AXE_TITLE, 0, 0)
  pop()

  // Horizontal axe name
  text(HORIZONTAL_AXE_TITLE, width / 2, origin[1] + AXE_TITLE_MARGIN)
  textStyle(NORMAL)

  let min_max = get_min_max()
  let axes_length = get_axes_length()

  // Draw scale text
  textSize(20)

  fill(GRADUATIONS_COLOR)

  // Origin values
  text(rnd(min_max[2], 1), origin[0] - GRADUATIONS_MARGIN, origin[1])
  text(min_max[0], origin[0], origin[1] + GRADUATIONS_MARGIN)

  // Horizontal graduation
  for (var i = 1; i < HORIZONTAL_RES + 1; i++)
  {
    noStroke()
    text(rnd(min_max[0] + i * ((min_max[1] - min_max[0]) / HORIZONTAL_RES), 0), origin[0] + (axes_length[0] / HORIZONTAL_RES * i), origin[1] + GRADUATIONS_MARGIN)

    stroke(GRID_COLOR)
    strokeWeight(GRID_WEIGHT)
    line(origin[0] + (axes_length[0] / HORIZONTAL_RES * i), origin[1], origin[0] + (axes_length[0] / HORIZONTAL_RES * i), p1[1])

  }

  // Vertical graduation
  for (var i = 1; i < VERTICAL_RES + 1; i++)
  {
    noStroke()
    text(rnd(min_max[2] + i * ((min_max[3] - min_max[2]) / VERTICAL_RES), 1), origin[0] - GRADUATIONS_MARGIN, origin[1] - (axes_length[1] / VERTICAL_RES * i))

    stroke(GRID_COLOR)
    strokeWeight(GRID_WEIGHT)
    line(origin[0], origin[1] - (axes_length[1] / VERTICAL_RES * i), p2[0], origin[1] - (axes_length[1] / VERTICAL_RES * i))
  }

  // Draw data
  for (var p of data)
  {
    let coords = get_coords(p, min_max, origin, axes_length)
    fill(100)
    noStroke()
    imageMode(CENTER, CENTER)
    // Dimension of flags : 550x367
    var img = get_image(p)
    print(img)
    // img.mask(maskImage)
    image(img, coords[0], coords[1], FLAG_SIZE * 550 / 367, FLAG_SIZE)
  }

  // Copyright and source
  fill(100)
  noStroke()
  textSize(15)
  text("Tom Marx - 2019", width / 2, height - 20)

}

function get_coords(point, min_max, origin, axes_length)
{
  let x = (point.x - min_max[0]) / (min_max[1] - min_max[0]) * axes_length[0]
  let y = -(point.y - min_max[2]) / (min_max[3] - min_max[2]) * axes_length[1]

  return [origin[0] + x, origin[1] + y]
}

function get_min_max()
{
  var min_x = null
  var max_x = null
  var min_y = null
  var max_y = null

  for (var p of data)
  {
    if (min_x == null)
    {
      min_x = p.x
    } else if (p.x < min_x)
    {
      min_x = p.x
    }

    if (min_y == null)
    {
      min_y = p.y
    } else if (p.y < min_y)
    {
      min_y = p.y
    }

    if (max_x == null)
    {
      max_x = p.x
    } else if (p.x > max_x)
    {
      max_x = p.x
    }

    if (max_y == null)
    {
      max_y = p.y
    } else if (p.y > max_y)
    {
      max_y = p.y
    }

  }

  return [min_x, max_x, min_y, max_y]
}

function get_axes_length()
{
  return [width - 2 * MARGIN, height - 2 * MARGIN]
}

function get_image(point)
{
  for (var i of images)
  {
    if (i.country == point.code)
    {
      return i.im
    }
  }
}

function graphics_to_image(graphics)
{
  var img = createImage(graphics.width, graphics.height)
  img.loadPixels()
  graphics.loadPixels()
    for (var x = 0; x < img.width; x++)
    {
      for (var y = 0; y < img.height; y++)
      {
        idx = 4 * (y * img.width + x)
        img.pixels[idx] = graphics.pixels[idx]
        img.pixels[idx+1] = graphics.pixels[idx+1]
        img.pixels[idx+2] = graphics.pixels[idx+2]
        img.pixels[idx+3] = graphics.pixels[idx+3]
      }
    }
  img.updatePixels()
  return img
}

function rnd(x, d)
{
  return (Math.round(x * Math.pow(10, d))) / Math.pow(10, d)
}
