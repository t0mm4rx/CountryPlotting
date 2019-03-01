const WIDTH = 1300
const HEIGHT = 800
const MARGIN = 100

const AXES_COLOR = 150
const AXES_WIDTH = 3

const TEXT_COLOR = 100
const TEXT_MARGIN = 40

const ARROW_SIZE = 10

const FLAG_SIZE = 25

const VERTICAL_AXE = "Happiness"
const HORIZONTAL_AXE = "Average income"
const AXE_MARGIN = 50
const AXE_TITLE_SIZE = 25

const data = [
  {
    x: 2,
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

const images = []

function preload()
{

  for (var p of data)
  {
    images.push({
      im: loadImage('flags/' + p.country + '.png'),
      country: p.country
    })
  }

}

function setup()
{

  createCanvas(WIDTH, HEIGHT)

  fill(200)
  noStroke()
  rect(0, 0, width, height)

  let origin = [MARGIN, height - MARGIN]
  let p1 = [origin[0], MARGIN]
  let p2 = [width - MARGIN, origin[1]]

  fill(AXES_COLOR)
  ellipseMode(CENTER, CENTER)

  // Vertical axe
  stroke(AXES_COLOR)
  strokeWeight(AXES_WIDTH)
  line(origin[0], origin[1], p1[0], p1[1])

  // Horizontal axe
  line(origin[0], origin[1], p2[0], p2[1])

  // Top arrow
  line(p1[0], p1[1], p1[0] - ARROW_SIZE, p1[1] + ARROW_SIZE)
  line(p1[0], p1[1], p1[0] + ARROW_SIZE, p1[1] + ARROW_SIZE)

  // Bottom arrow
  line(p2[0], p2[1], p2[0] - ARROW_SIZE, p2[1] - ARROW_SIZE)
  line(p2[0], p2[1], p2[0] - ARROW_SIZE, p2[1] + ARROW_SIZE)

  fill(TEXT_COLOR)
  textFont('PT Mono')
  textSize(AXE_TITLE_SIZE)
  textAlign(CENTER, CENTER)
  noStroke()

  // Vertical axe name
  push()
  translate(origin[0] - AXE_MARGIN, height / 2)
  rotate(-1/2 * PI)
  text(VERTICAL_AXE, 0, 0)
  pop()

  // Horizontal axe name
  text(HORIZONTAL_AXE, width / 2, origin[1] + AXE_MARGIN)

  // Draw data
  let min_max = get_min_max()
  let axes_length = get_axes_length()
  for (var p of data)
  {
    let coords = get_coords(p, min_max, origin, axes_length)
    fill(100)
    noStroke()
    imageMode(CENTER, CENTER)
    // Dimension of flags : 550x367
    image(get_image(p), coords[0], coords[1], FLAG_SIZE * 550 / 367, FLAG_SIZE)
  }

  // Draw scale text
  textSize(20)

  // Min
  text(min_max[0], origin[0] - TEXT_MARGIN, origin[1])
  text(min_max[2], origin[0], origin[1] + TEXT_MARGIN)

  // Max
  text(min_max[1], p1[0] - TEXT_MARGIN, p1[1])
  text(min_max[3], p2[0], p2[1] + TEXT_MARGIN)

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
    if (i.country == point.country)
    {
      return i.im
    }
  }
}
