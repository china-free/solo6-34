type DrawFunction = (ctx: CanvasRenderingContext2D, size: number) => void;

const COLORS = {
  RED: '#E30613',
  RED_DARK: '#C00A10',
  YELLOW: '#FFD700',
  YELLOW_BG: '#F8D305',
  BLUE: '#0055A4',
  BLUE_DARK: '#003F7D',
  GREEN: '#00A651',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY: '#888888',
};

function setupContext(ctx: CanvasRenderingContext2D, size: number) {
  const scale = size / 256;
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(size / 2, size / 2);
  ctx.scale(scale, scale);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

function drawCircle(ctx: CanvasRenderingContext2D, r: number, fill?: string, stroke?: string, lw = 0) {
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
}

function drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawTriangle(ctx: CanvasRenderingContext2D, size: number, fill?: string, stroke?: string, lw = 0) {
  const h = size * Math.sqrt(3) / 2;
  ctx.beginPath();
  ctx.moveTo(0, -h * 2 / 3 + h / 3);
  ctx.lineTo(-size / 2, h / 3 + h / 3);
  ctx.lineTo(size / 2, h / 3 + h / 3);
  ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
}

function drawText(ctx: CanvasRenderingContext2D, text: string, fontSize: number, color: string, y = 0, bold = true) {
  ctx.fillStyle = color;
  ctx.font = `${bold ? 'bold ' : ''}${fontSize}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, y);
}

function drawArrow(ctx: CanvasRenderingContext2D, x: number, y: number, up = true) {
  ctx.beginPath();
  ctx.moveTo(x, y + (up ? 40 : -40));
  ctx.lineTo(x, y - (up ? 25 : -25));
  ctx.lineTo(x - 18, y - (up ? -5 : 5));
  ctx.moveTo(x, y - (up ? 25 : -25));
  ctx.lineTo(x + 18, y - (up ? -5 : 5));
  ctx.strokeStyle = COLORS.WHITE;
  ctx.lineWidth = 14;
  ctx.stroke();
}

function drawPerson(ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1, color = COLORS.BLACK) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, -28, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(0, 8);
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-18, -8);
  ctx.lineTo(18, -8);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(-14, 30);
  ctx.moveTo(0, 8);
  ctx.lineTo(14, 30);
  ctx.stroke();
  ctx.restore();
}

function drawCarIcon(ctx: CanvasRenderingContext2D, x: number, y: number, color = COLORS.BLACK) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-45, 15);
  ctx.lineTo(-40, -10);
  ctx.lineTo(-25, -25);
  ctx.lineTo(25, -25);
  ctx.lineTo(40, -10);
  ctx.lineTo(45, 15);
  ctx.lineTo(35, 15);
  ctx.lineTo(30, 25);
  ctx.lineTo(18, 25);
  ctx.lineTo(13, 15);
  ctx.lineTo(-13, 15);
  ctx.lineTo(-18, 25);
  ctx.lineTo(-30, 25);
  ctx.lineTo(-35, 15);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-24, 25, 7, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.WHITE;
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(24, 25, 7, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.WHITE;
  ctx.fill();
  ctx.restore();
}

function drawBikeIcon(ctx: CanvasRenderingContext2D, x: number, y: number, color = COLORS.BLACK) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(-28, 18, 16, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(28, 18, 16, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-28, 18);
  ctx.lineTo(-5, -10);
  ctx.lineTo(15, -10);
  ctx.lineTo(28, 18);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-5, -10);
  ctx.lineTo(5, 18);
  ctx.lineTo(28, 18);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, -22, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, -16);
  ctx.lineTo(15, -10);
  ctx.stroke();
  ctx.restore();
}

const drawFunctions: Record<string, DrawFunction> = {
  no_entry(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.RED, COLORS.WHITE, 8);
    drawCircle(ctx, 90, COLORS.WHITE);
    ctx.strokeStyle = COLORS.RED;
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(-65, 0);
    ctx.lineTo(65, 0);
    ctx.stroke();
    ctx.restore();
  },
  no_entry_road(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.RED, COLORS.WHITE, 8);
    drawCircle(ctx, 90, COLORS.WHITE);
    ctx.fillStyle = COLORS.RED;
    ctx.fillRect(-75, -18, 150, 36);
    ctx.restore();
  },
  no_motor_vehicle(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.WHITE, COLORS.RED, 12);
    drawCarIcon(ctx, 0, 0, COLORS.BLACK);
    ctx.strokeStyle = COLORS.RED;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(-75, -75);
    ctx.lineTo(75, 75);
    ctx.stroke();
    ctx.restore();
  },
  no_bicycle(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.WHITE, COLORS.RED, 12);
    drawBikeIcon(ctx, 0, 0, COLORS.BLACK);
    ctx.strokeStyle = COLORS.RED;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(-75, -75);
    ctx.lineTo(75, 75);
    ctx.stroke();
    ctx.restore();
  },
  no_pedestrian(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.WHITE, COLORS.RED, 12);
    drawPerson(ctx, 0, 0, 1.2, COLORS.BLACK);
    ctx.strokeStyle = COLORS.RED;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(-75, -75);
    ctx.lineTo(75, 75);
    ctx.stroke();
    ctx.restore();
  },
  no_parking(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.BLUE, COLORS.RED, 12);
    drawCircle(ctx, 95, COLORS.BLUE);
    ctx.strokeStyle = COLORS.RED;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(-75, -75);
    ctx.lineTo(75, 75);
    ctx.stroke();
    ctx.restore();
  },
  no_long_parking(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.BLUE, COLORS.RED, 12);
    drawCircle(ctx, 95, COLORS.BLUE);
    ctx.restore();
  },
  no_horn(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.WHITE, COLORS.RED, 12);
    ctx.save();
    ctx.translate(0, 0);
    ctx.fillStyle = COLORS.BLACK;
    ctx.beginPath();
    ctx.moveTo(-40, -15);
    ctx.lineTo(-10, -15);
    ctx.lineTo(15, -40);
    ctx.lineTo(15, 40);
    ctx.lineTo(-10, 15);
    ctx.lineTo(-40, 15);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(-50, -10, 10, 20);
    ctx.strokeStyle = COLORS.BLACK;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(30, 0, 18, -Math.PI / 3, Math.PI / 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(45, 0, 28, -Math.PI / 3, Math.PI / 3);
    ctx.stroke();
    ctx.restore();
    ctx.strokeStyle = COLORS.RED;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(-75, -75);
    ctx.lineTo(75, 75);
    ctx.stroke();
    ctx.restore();
  },
  height_limit(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.WHITE, COLORS.RED, 12);
    ctx.fillStyle = COLORS.BLACK;
    ctx.fillRect(-70, -60, 140, 8);
    ctx.fillRect(-60, -60, 8, 110);
    ctx.fillRect(52, -60, 8, 110);
    drawText(ctx, '3.5m', 36, COLORS.BLACK, 40);
    ctx.restore();
  },
  width_limit(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.WHITE, COLORS.RED, 12);
    ctx.fillStyle = COLORS.BLACK;
    ctx.fillRect(-50, -70, 8, 140);
    ctx.fillRect(42, -70, 8, 140);
    ctx.save();
    ctx.translate(0, 0);
    ctx.rotate(-Math.PI / 2);
    drawText(ctx, '3m', 36, COLORS.BLACK, 0);
    ctx.restore();
    ctx.restore();
  },
  speed_limit_60(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.WHITE, COLORS.RED, 12);
    drawText(ctx, '60', 80, COLORS.BLACK, 5);
    ctx.restore();
  },
  end_speed_limit_60(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.WHITE, COLORS.BLACK, 8);
    drawText(ctx, '60', 80, COLORS.BLACK, 5);
    ctx.strokeStyle = COLORS.BLACK;
    ctx.lineWidth = 8;
    ctx.save();
    ctx.translate(0, 0);
    ctx.rotate(-Math.PI / 6);
    ctx.beginPath();
    ctx.moveTo(-100, -100);
    ctx.lineTo(100, 100);
    ctx.stroke();
    ctx.restore();
    ctx.restore();
  },
  crossroads(ctx, size) {
    setupContext(ctx, size);
    drawTriangle(ctx, 200, COLORS.YELLOW_BG, COLORS.BLACK, 8);
    ctx.fillStyle = COLORS.BLACK;
    ctx.fillRect(-10, -60, 20, 120);
    ctx.fillRect(-60, -10, 120, 20);
    ctx.restore();
  },
  sharp_turn_left(ctx, size) {
    setupContext(ctx, size);
    drawTriangle(ctx, 200, COLORS.YELLOW_BG, COLORS.BLACK, 8);
    ctx.strokeStyle = COLORS.BLACK;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(35, 50);
    ctx.lineTo(35, -10);
    ctx.arc(-10, -10, 45, 0, Math.PI / 2, true);
    ctx.lineTo(-55, -55);
    ctx.stroke();
    ctx.fillStyle = COLORS.BLACK;
    ctx.beginPath();
    ctx.moveTo(-55, -55);
    ctx.lineTo(-75, -35);
    ctx.lineTo(-35, -35);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  sharp_turn_right(ctx, size) {
    setupContext(ctx, size);
    drawTriangle(ctx, 200, COLORS.YELLOW_BG, COLORS.BLACK, 8);
    ctx.strokeStyle = COLORS.BLACK;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-35, 50);
    ctx.lineTo(-35, -10);
    ctx.arc(10, -10, 45, Math.PI, Math.PI / 2, false);
    ctx.lineTo(55, -55);
    ctx.stroke();
    ctx.fillStyle = COLORS.BLACK;
    ctx.beginPath();
    ctx.moveTo(55, -55);
    ctx.lineTo(75, -35);
    ctx.lineTo(35, -35);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  continuous_turns(ctx, size) {
    setupContext(ctx, size);
    drawTriangle(ctx, 200, COLORS.YELLOW_BG, COLORS.BLACK, 8);
    ctx.strokeStyle = COLORS.BLACK;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(45, 55);
    ctx.lineTo(45, 10);
    ctx.arc(10, 10, 35, 0, Math.PI, true);
    ctx.lineTo(-25, 10);
    ctx.arc(-25, -25, 35, Math.PI, 0, false);
    ctx.lineTo(10, -25);
    ctx.stroke();
    ctx.fillStyle = COLORS.BLACK;
    ctx.beginPath();
    ctx.moveTo(10, -60);
    ctx.lineTo(-10, -40);
    ctx.lineTo(30, -40);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  steep_ascent(ctx, size) {
    setupContext(ctx, size);
    drawTriangle(ctx, 200, COLORS.YELLOW_BG, COLORS.BLACK, 8);
    ctx.fillStyle = COLORS.BLACK;
    ctx.beginPath();
    ctx.moveTo(-60, 50);
    ctx.lineTo(60, -50);
    ctx.lineTo(60, 50);
    ctx.closePath();
    ctx.fill();
    drawText(ctx, '上', 28, COLORS.WHITE, 18);
    ctx.restore();
  },
  steep_descent(ctx, size) {
    setupContext(ctx, size);
    drawTriangle(ctx, 200, COLORS.YELLOW_BG, COLORS.BLACK, 8);
    ctx.fillStyle = COLORS.BLACK;
    ctx.beginPath();
    ctx.moveTo(-60, -50);
    ctx.lineTo(60, 50);
    ctx.lineTo(-60, 50);
    ctx.closePath();
    ctx.fill();
    drawText(ctx, '下', 28, COLORS.WHITE, 18);
    ctx.restore();
  },
  watch_pedestrian(ctx, size) {
    setupContext(ctx, size);
    drawTriangle(ctx, 200, COLORS.YELLOW_BG, COLORS.BLACK, 8);
    drawPerson(ctx, 0, 5, 1, COLORS.BLACK);
    ctx.restore();
  },
  watch_children(ctx, size) {
    setupContext(ctx, size);
    drawTriangle(ctx, 200, COLORS.YELLOW_BG, COLORS.BLACK, 8);
    drawPerson(ctx, -18, 10, 0.8, COLORS.BLACK);
    drawPerson(ctx, 22, 15, 0.8, COLORS.BLACK);
    ctx.save();
    ctx.translate(2, -15);
    ctx.strokeStyle = COLORS.BLACK;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 18, -Math.PI * 0.8, -Math.PI * 0.2);
    ctx.stroke();
    ctx.restore();
    ctx.restore();
  },
  watch_traffic_light(ctx, size) {
    setupContext(ctx, size);
    drawTriangle(ctx, 200, COLORS.YELLOW_BG, COLORS.BLACK, 8);
    ctx.save();
    ctx.translate(0, 0);
    ctx.fillStyle = COLORS.BLACK;
    drawRoundRect(ctx, -25, -60, 50, 100, 8);
    ctx.fill();
    const lights = ['#E30613', '#FFD700', '#00A651'];
    lights.forEach((c, i) => {
      ctx.beginPath();
      ctx.arc(0, -35 + i * 30, 12, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
    });
    ctx.restore();
    ctx.restore();
  },
  school_zone(ctx, size) {
    setupContext(ctx, size);
    drawTriangle(ctx, 200, COLORS.YELLOW_BG, COLORS.BLACK, 8);
    ctx.fillStyle = COLORS.BLACK;
    drawPerson(ctx, -20, 10, 0.85, COLORS.BLACK);
    drawPerson(ctx, 25, 15, 0.85, COLORS.BLACK);
    drawText(ctx, '学校', 16, COLORS.BLACK, -45);
    ctx.restore();
  },
  go_straight(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.BLUE);
    drawArrow(ctx, 0, 0, true);
    ctx.restore();
  },
  turn_left(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.BLUE);
    ctx.save();
    ctx.translate(0, 0);
    ctx.rotate(-Math.PI / 2);
    drawArrow(ctx, 0, 0, true);
    ctx.restore();
    ctx.restore();
  },
  turn_right(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.BLUE);
    ctx.save();
    ctx.translate(0, 0);
    ctx.rotate(Math.PI / 2);
    drawArrow(ctx, 0, 0, true);
    ctx.restore();
    ctx.restore();
  },
  straight_or_left(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.BLUE);
    ctx.strokeStyle = COLORS.WHITE;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(0, -30);
    ctx.stroke();
    ctx.fillStyle = COLORS.WHITE;
    ctx.beginPath();
    ctx.moveTo(0, -60);
    ctx.lineTo(-18, -35);
    ctx.lineTo(18, -35);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(-55, -10);
    ctx.lineTo(-55, 0);
    ctx.strokeStyle = COLORS.WHITE;
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.fillStyle = COLORS.WHITE;
    ctx.beginPath();
    ctx.moveTo(-60, -5);
    ctx.lineTo(-35, -22);
    ctx.lineTo(-35, 12);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  pedestrian_crossing(ctx, size) {
    setupContext(ctx, size);
    ctx.fillStyle = COLORS.BLUE;
    drawRoundRect(ctx, -105, -105, 210, 210, 15);
    ctx.fill();
    ctx.fillStyle = COLORS.WHITE;
    drawRoundRect(ctx, -85, -75, 170, 150, 5);
    ctx.fill();
    ctx.fillStyle = COLORS.BLACK;
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(-60 + i * 28, -50, 16, 100);
    }
    ctx.restore();
  },
  motor_vehicle_lane(ctx, size) {
    setupContext(ctx, size);
    ctx.fillStyle = COLORS.BLUE;
    drawRoundRect(ctx, -105, -105, 210, 210, 15);
    ctx.fill();
    drawCarIcon(ctx, 0, 10, COLORS.WHITE);
    drawText(ctx, '机动车道', 18, COLORS.WHITE, 65);
    ctx.restore();
  },
  bicycle_lane(ctx, size) {
    setupContext(ctx, size);
    ctx.fillStyle = COLORS.BLUE;
    drawRoundRect(ctx, -105, -105, 210, 210, 15);
    ctx.fill();
    drawBikeIcon(ctx, 0, 10, COLORS.WHITE);
    drawText(ctx, '非机动车道', 18, COLORS.WHITE, 65);
    ctx.restore();
  },
  min_speed_50(ctx, size) {
    setupContext(ctx, size);
    drawCircle(ctx, 110, COLORS.BLUE);
    drawText(ctx, '50', 75, COLORS.WHITE, 5);
    drawText(ctx, '最低时速', 14, COLORS.WHITE, 55);
    ctx.restore();
  },
};

export function drawTrafficSign(ctx: CanvasRenderingContext2D, drawKey: string, size: number) {
  const drawFn = drawFunctions[drawKey];
  if (drawFn) {
    drawFn(ctx, size);
  } else {
    setupContext(ctx, size);
    drawCircle(ctx, 100, COLORS.GRAY);
    drawText(ctx, '?', 80, COLORS.WHITE, 0);
    ctx.restore();
  }
}

export const availableDrawKeys = Object.keys(drawFunctions);
