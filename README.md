# Breakout Game

A classic Breakout game implementation built with vanilla JavaScript and HTML5 Canvas, featuring neon-style graphics and multiple levels.

## Features

- **Classic Breakout Gameplay**: Control a paddle to bounce a ball and destroy colorful bricks
- **Multiple Levels**: 4 different level layouts with increasing difficulty
- **Progressive Difficulty**: Each stage increases ball speed and resets levels
- **Lives System**: Start with 3 lives, lose one when the ball hits the bottom
- **Scoring System**: Earn points based on brick types (10 points per brick type level)
- **Neon Visual Style**: Glowing effects and vibrant colors
- **Sound Effects**: Audio feedback for collisions and game events
- **Game States**: Menu, running, paused, game over, and new level screens

## Controls

- **A / Left Arrow**: Move paddle left (launches ball if stationary)
- **D / Right Arrow**: Move paddle right (launches ball if stationary)
- **Space Bar**: Start game / Start new game after game over
- **Escape**: Pause/unpause game

## Game Objects

### Paddle
- Cyan glowing paddle at the bottom of the screen
- Moves horizontally with keyboard input
- Launches the ball when moved while ball is stationary

### Ball
- Pink glowing ball with collision detection
- Bounces off walls, paddle, and bricks
- Resets position when hitting the bottom (costs a life)

### Bricks
- 6 different colored brick types with varying point values
- Each type has unique colors and point multipliers
- Destroyed on contact with the ball

## Level System

The game includes 4 unique levels with different brick patterns:

1. **Level 1**: Full grid of all brick types
2. **Level 2**: Alternating pattern with gaps
3. **Level 3**: Mixed density patterns
4. **Level 4**: Complex alternating layouts

After completing all levels, the game cycles back to Level 1 with increased difficulty (faster ball speed).

## Installation & Setup

### Prerequisites
- Node.js (for development server)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd breakout-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8081`

## Development

### Available Scripts

- `npm run dev`: Start development server with live reload and linting
- `npm run lint`: Run ESLint to check code quality
- `npm test`: Run tests (currently not implemented)

### Project Structure

```
breakout-game/
├── src/
│   ├── lib/
│   │   ├── game.js          # Main game controller
│   │   ├── paddle.js        # Paddle class
│   │   ├── ball.js          # Ball class
│   │   ├── brick.js         # Brick class
│   │   ├── levels.js        # Level definitions
│   │   ├── inputHandler.js  # Keyboard input handling
│   │   └── collusionDetection.js # Collision detection utilities
│   ├── utilities/
│   │   ├── colors.js        # Console color utilities
│   │   └── drawObjects.js   # Custom drawing utilities
│   └── game.js              # Main entry point
├── assets/
│   └── sounds/              # Game sound effects
├── index.html               # Main HTML file
├── server.js                # Express development server
└── package.json
```

### Code Style

The project uses ESLint with the following key rules:
- 4-space indentation
- Semicolons required
- Single quotes preferred
- Console and debugger statements allowed for development

## Game Architecture

### Game States
- `MENU`: Initial state, waiting for player to start
- `RUNNING`: Active gameplay
- `PAUSED`: Game paused by player
- `GAME_OVER`: All lives lost
- `NEW_LEVEL`: Transition between levels
- `FINISHED_GAME`: All levels completed

### Collision Detection
The game uses a custom collision detection system that checks for overlapping boundaries between the ball and game objects (paddle, bricks).

### Rendering
- Uses HTML5 Canvas for all graphics
- Implements glow effects using canvas shadows
- 60 FPS game loop with `requestAnimationFrame`

## Assets

### Sound Effects
- Ball collision sounds
- Brick destruction effects
- New level audio
- Game over sound

*Note: Audio files should be placed in the `assets/sounds/` directory*

## Browser Compatibility

- Modern browsers with HTML5 Canvas support
- ES6 module support required
- Audio API support for sound effects

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

Created by Henrijs Kons (LAUVz)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## Known Issues

- Audio files may need to be added to the `assets/sounds/` directory
- Some collision detection edge cases may exist
- Browser audio autoplay policies may affect sound effects

## Future Enhancements

- Power-ups and special bricks
- High score persistence
- Touch/mobile controls
- Additional visual effects
- More level varieties
