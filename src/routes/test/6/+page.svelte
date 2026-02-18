<script lang="ts">
  // --- CONFIGURATION ---
  let baseUnit = 20;
  let gap = 8;
  let showGrid = false;
  let innerWidth = 0;
  const scale = 5;

  interface Layout {
    x: number;
    y: number;
    w: number;
    h: number;
  }
  interface CardData {
    id: string;
    title: string;
    content: string;
    color: string;
    layouts: { sm: Layout; md: Layout; lg: Layout; xl: Layout };
  }

  // Reactive State
  let measuredHeights: Record<string, number> = {};
  let calculatedLayouts: Record<string, { start: number; span: number }> = {};

  const cardData: CardData[] = [
    // --- SECTION 1: HERO (The Anchor) ---
    {
      id: '1',
      title: 'User',
      content: 'arch_user@tty1',
      color: '#1793d1',
      layouts: {
        sm: { x: 1, y: 1, w: 2, h: 2 },
        md: { x: 1, y: 1, w: 2, h: 2 },
        lg: { x: 1, y: 1, w: 3, h: 3 },
        xl: { x: 1, y: 1, w: 4, h: 4 },
      },
    },
    {
      id: '2',
      title: 'Clock',
      content: '09:42 AM',
      color: '#212529',
      layouts: {
        sm: { x: 1, y: 3, w: 1, h: 1 },
        md: { x: 3, y: 1, w: 2, h: 1 },
        lg: { x: 4, y: 1, w: 3, h: 2 },
        xl: { x: 5, y: 1, w: 4, h: 2 },
      },
    },
    {
      id: '3',
      title: 'Date',
      content: 'Dec 25, 2025',
      color: '#343A40',
      layouts: {
        sm: { x: 2, y: 3, w: 1, h: 1 },
        md: { x: 3, y: 2, w: 2, h: 1 },
        lg: { x: 4, y: 3, w: 3, h: 1 },
        xl: { x: 5, y: 3, w: 4, h: 2 },
      },
    },
    {
      id: '4',
      title: 'Weather',
      content: '12°C Rainy',
      color: '#495057',
      layouts: {
        sm: { x: 1, y: 4, w: 2, h: 1 },
        md: { x: 5, y: 1, w: 2, h: 2 },
        lg: { x: 7, y: 1, w: 3, h: 3 },
        xl: { x: 9, y: 1, w: 4, h: 4 },
      },
    },
    // Note: On LG/XL, we leave columns 10-12/13-24 open or for other distinct groups

    // --- SECTION 2: SYSTEM VITALS (The Dashboard) ---
    // Intentional Gap: We start lower down
    {
      id: '5',
      title: 'CPU Load',
      content: '12%',
      color: '#FF6B6B',
      layouts: {
        sm: { x: 1, y: 5, w: 1, h: 2 },
        md: { x: 1, y: 4, w: 2, h: 2 },
        lg: { x: 1, y: 5, w: 2, h: 2 },
        xl: { x: 1, y: 6, w: 3, h: 2 },
      },
    },
    {
      id: '6',
      title: 'RAM Use',
      content: '8.4 GB',
      color: '#FF8787',
      layouts: {
        sm: { x: 2, y: 5, w: 1, h: 2 },
        md: { x: 3, y: 4, w: 2, h: 2 },
        lg: { x: 3, y: 5, w: 2, h: 2 },
        xl: { x: 4, y: 6, w: 3, h: 2 },
      },
    },
    {
      id: '7',
      title: 'Swap',
      content: '0%',
      color: '#FFA8A8',
      layouts: {
        sm: { x: 1, y: 7, w: 1, h: 1 },
        md: { x: 5, y: 4, w: 1, h: 2 },
        lg: { x: 5, y: 5, w: 1, h: 2 },
        xl: { x: 7, y: 6, w: 2, h: 2 },
      },
    },
    {
      id: '8',
      title: 'Uptime',
      content: '4d 2h',
      color: '#FFC9C9',
      layouts: {
        sm: { x: 2, y: 7, w: 1, h: 1 },
        md: { x: 6, y: 4, w: 1, h: 2 },
        lg: { x: 6, y: 5, w: 1, h: 2 },
        xl: { x: 9, y: 6, w: 2, h: 2 },
      },
    },

    // Hardware Sensors (Smaller Grid)
    {
      id: '9',
      title: 'CPU Temp',
      content: '45°C',
      color: '#FCC419',
      layouts: {
        sm: { x: 1, y: 8, w: 1, h: 1 },
        md: { x: 1, y: 6, w: 1, h: 1 },
        lg: { x: 1, y: 7, w: 1, h: 1 },
        xl: { x: 1, y: 8, w: 2, h: 1 },
      },
    },
    {
      id: '10',
      title: 'GPU Temp',
      content: '52°C',
      color: '#FCC419',
      layouts: {
        sm: { x: 2, y: 8, w: 1, h: 1 },
        md: { x: 2, y: 6, w: 1, h: 1 },
        lg: { x: 2, y: 7, w: 1, h: 1 },
        xl: { x: 3, y: 8, w: 2, h: 1 },
      },
    },
    {
      id: '11',
      title: 'Fan 1',
      content: '1200',
      color: '#FFE066',
      layouts: {
        sm: { x: 1, y: 9, w: 1, h: 1 },
        md: { x: 3, y: 6, w: 1, h: 1 },
        lg: { x: 3, y: 7, w: 1, h: 1 },
        xl: { x: 5, y: 8, w: 2, h: 1 },
      },
    },
    {
      id: '12',
      title: 'Fan 2',
      content: '1100',
      color: '#FFE066',
      layouts: {
        sm: { x: 2, y: 9, w: 1, h: 1 },
        md: { x: 4, y: 6, w: 1, h: 1 },
        lg: { x: 4, y: 7, w: 1, h: 1 },
        xl: { x: 7, y: 8, w: 2, h: 1 },
      },
    },

    // Storage Cluster (Mid Right on Desktop)
    {
      id: '13',
      title: '/',
      content: '80% Full',
      color: '#94D82D',
      layouts: {
        sm: { x: 1, y: 10, w: 2, h: 1 },
        md: { x: 5, y: 6, w: 2, h: 1 },
        lg: { x: 7, y: 5, w: 3, h: 1 },
        xl: { x: 13, y: 6, w: 4, h: 1 },
      },
    },
    {
      id: '14',
      title: '/home',
      content: '42% Full',
      color: '#B2F2BB',
      layouts: {
        sm: { x: 1, y: 11, w: 2, h: 1 },
        md: { x: 5, y: 7, w: 2, h: 1 },
        lg: { x: 7, y: 6, w: 3, h: 1 },
        xl: { x: 13, y: 7, w: 4, h: 1 },
      },
    },
    {
      id: '15',
      title: '/mnt',
      content: '90% Full',
      color: '#D8F5A2',
      layouts: {
        sm: { x: 1, y: 12, w: 2, h: 1 },
        md: { x: 5, y: 8, w: 2, h: 1 },
        lg: { x: 7, y: 7, w: 3, h: 1 },
        xl: { x: 13, y: 8, w: 4, h: 1 },
      },
    },

    // --- SECTION 3: NETWORK & TOOLS ---
    // We add a gap of Y=1 here on Desktop to separate Hardware from Software
    {
      id: '16',
      title: 'Net Down',
      content: '15 MB/s',
      color: '#339AF0',
      layouts: {
        sm: { x: 1, y: 13, w: 1, h: 1 },
        md: { x: 1, y: 9, w: 2, h: 2 },
        lg: { x: 1, y: 9, w: 2, h: 2 },
        xl: { x: 1, y: 10, w: 3, h: 2 },
      },
    },
    {
      id: '17',
      title: 'Net Up',
      content: '2 MB/s',
      color: '#4DABF7',
      layouts: {
        sm: { x: 2, y: 13, w: 1, h: 1 },
        md: { x: 3, y: 9, w: 2, h: 2 },
        lg: { x: 3, y: 9, w: 2, h: 2 },
        xl: { x: 4, y: 10, w: 3, h: 2 },
      },
    },
    {
      id: '18',
      title: 'VPN',
      content: 'Wireguard',
      color: '#74C0FC',
      layouts: {
        sm: { x: 1, y: 14, w: 2, h: 1 },
        md: { x: 5, y: 9, w: 2, h: 1 },
        lg: { x: 5, y: 9, w: 2, h: 1 },
        xl: { x: 7, y: 10, w: 2, h: 1 },
      },
    },
    {
      id: '19',
      title: 'Public IP',
      content: '192.x.x',
      color: '#A5D8FF',
      layouts: {
        sm: { x: 1, y: 15, w: 2, h: 1 },
        md: { x: 5, y: 10, w: 2, h: 1 },
        lg: { x: 5, y: 10, w: 2, h: 1 },
        xl: { x: 7, y: 11, w: 2, h: 1 },
      },
    },

    // Developer Status Items
    {
      id: '20',
      title: 'Docker',
      content: '5 Active',
      color: '#66d9e8',
      layouts: {
        sm: { x: 1, y: 16, w: 1, h: 1 },
        md: { x: 1, y: 11, w: 1, h: 1 },
        lg: { x: 7, y: 9, w: 1, h: 1 },
        xl: { x: 18, y: 6, w: 2, h: 1 },
      },
    },
    {
      id: '21',
      title: 'Podman',
      content: '2 Stopped',
      color: '#66d9e8',
      layouts: {
        sm: { x: 2, y: 16, w: 1, h: 1 },
        md: { x: 2, y: 11, w: 1, h: 1 },
        lg: { x: 8, y: 9, w: 1, h: 1 },
        xl: { x: 20, y: 6, w: 2, h: 1 },
      },
    },
    {
      id: '22',
      title: 'Node',
      content: 'v20.1',
      color: '#99e9f2',
      layouts: {
        sm: { x: 1, y: 17, w: 1, h: 1 },
        md: { x: 3, y: 11, w: 1, h: 1 },
        lg: { x: 9, y: 9, w: 1, h: 1 },
        xl: { x: 22, y: 6, w: 2, h: 1 },
      },
    },
    {
      id: '23',
      title: 'Rust',
      content: 'v1.75',
      color: '#99e9f2',
      layouts: {
        sm: { x: 2, y: 17, w: 1, h: 1 },
        md: { x: 4, y: 11, w: 1, h: 1 },
        lg: { x: 10, y: 9, w: 1, h: 1 },
        xl: { x: 18, y: 7, w: 2, h: 1 },
      },
    },
    {
      id: '24',
      title: 'Go',
      content: 'v1.21',
      color: '#c5f6fa',
      layouts: {
        sm: { x: 1, y: 18, w: 1, h: 1 },
        md: { x: 5, y: 11, w: 1, h: 1 },
        lg: { x: 11, y: 9, w: 1, h: 1 },
        xl: { x: 20, y: 7, w: 2, h: 1 },
      },
    },
    {
      id: '25',
      title: 'Python',
      content: 'v3.12',
      color: '#c5f6fa',
      layouts: {
        sm: { x: 2, y: 18, w: 1, h: 1 },
        md: { x: 6, y: 11, w: 1, h: 1 },
        lg: { x: 12, y: 9, w: 1, h: 1 },
        xl: { x: 22, y: 7, w: 2, h: 1 },
      },
    },

    // --- SECTION 4: MEDIA & SOCIAL ---
    // A Large Block
    {
      id: '26',
      title: 'Spotify',
      content: 'Pink Floyd - Time',
      color: '#1DB954',
      layouts: {
        sm: { x: 1, y: 19, w: 2, h: 2 },
        md: { x: 1, y: 12, w: 4, h: 2 },
        lg: { x: 1, y: 12, w: 4, h: 3 },
        xl: { x: 18, y: 9, w: 6, h: 4 },
      },
    },
    {
      id: '27',
      title: 'Vol',
      content: '80%',
      color: '#1ED760',
      layouts: {
        sm: { x: 1, y: 21, w: 1, h: 1 },
        md: { x: 5, y: 12, w: 2, h: 2 },
        lg: { x: 5, y: 12, w: 2, h: 1 },
        xl: { x: 13, y: 10, w: 2, h: 1 },
      },
    },
    {
      id: '28',
      title: 'Mic',
      content: 'Muted',
      color: '#1ED760',
      layouts: {
        sm: { x: 2, y: 21, w: 1, h: 1 },
        md: { x: 5, y: 14, w: 2, h: 1 },
        lg: { x: 5, y: 14, w: 2, h: 1 },
        xl: { x: 15, y: 10, w: 2, h: 1 },
      },
    },

    // Social Stack
    {
      id: '29',
      title: 'Discord',
      content: '3 Unread',
      color: '#5865F2',
      layouts: {
        sm: { x: 1, y: 22, w: 2, h: 1 },
        md: { x: 1, y: 14, w: 2, h: 1 },
        lg: { x: 7, y: 12, w: 3, h: 2 },
        xl: { x: 13, y: 11, w: 4, h: 2 },
      },
    },
    {
      id: '30',
      title: 'Slack',
      content: 'No msgs',
      color: '#4A154B',
      layouts: {
        sm: { x: 1, y: 23, w: 2, h: 1 },
        md: { x: 3, y: 14, w: 2, h: 1 },
        lg: { x: 10, y: 12, w: 3, h: 2 },
        xl: { x: 1, y: 13, w: 4, h: 2 },
      },
    },

    // --- SECTION 5: THE 1x1 TOGGLE GRID (Quick Actions) ---
    // Realistic use case: Smart home or system toggles
    {
      id: '31',
      title: 'SSH',
      content: 'ON',
      color: '#CED4DA',
      layouts: {
        sm: { x: 1, y: 24, w: 1, h: 1 },
        md: { x: 1, y: 16, w: 1, h: 1 },
        lg: { x: 1, y: 16, w: 1, h: 1 },
        xl: { x: 6, y: 13, w: 1, h: 1 },
      },
    },
    {
      id: '32',
      title: 'FTP',
      content: 'OFF',
      color: '#CED4DA',
      layouts: {
        sm: { x: 2, y: 24, w: 1, h: 1 },
        md: { x: 2, y: 16, w: 1, h: 1 },
        lg: { x: 2, y: 16, w: 1, h: 1 },
        xl: { x: 7, y: 13, w: 1, h: 1 },
      },
    },
    {
      id: '33',
      title: 'HTTP',
      content: 'ON',
      color: '#CED4DA',
      layouts: {
        sm: { x: 1, y: 25, w: 1, h: 1 },
        md: { x: 3, y: 16, w: 1, h: 1 },
        lg: { x: 3, y: 16, w: 1, h: 1 },
        xl: { x: 8, y: 13, w: 1, h: 1 },
      },
    },
    {
      id: '34',
      title: 'RDP',
      content: 'OFF',
      color: '#CED4DA',
      layouts: {
        sm: { x: 2, y: 25, w: 1, h: 1 },
        md: { x: 4, y: 16, w: 1, h: 1 },
        lg: { x: 4, y: 16, w: 1, h: 1 },
        xl: { x: 9, y: 13, w: 1, h: 1 },
      },
    },
    {
      id: '35',
      title: 'NFC',
      content: 'SCAN',
      color: '#DEE2E6',
      layouts: {
        sm: { x: 1, y: 26, w: 1, h: 1 },
        md: { x: 5, y: 16, w: 1, h: 1 },
        lg: { x: 5, y: 16, w: 1, h: 1 },
        xl: { x: 10, y: 13, w: 1, h: 1 },
      },
    },
    {
      id: '36',
      title: 'BT',
      content: 'PAIR',
      color: '#DEE2E6',
      layouts: {
        sm: { x: 2, y: 26, w: 1, h: 1 },
        md: { x: 6, y: 16, w: 1, h: 1 },
        lg: { x: 6, y: 16, w: 1, h: 1 },
        xl: { x: 11, y: 13, w: 1, h: 1 },
      },
    },
    {
      id: '37',
      title: 'DND',
      content: 'OFF',
      color: '#DEE2E6',
      layouts: {
        sm: { x: 1, y: 27, w: 1, h: 1 },
        md: { x: 1, y: 17, w: 1, h: 1 },
        lg: { x: 7, y: 16, w: 1, h: 1 },
        xl: { x: 6, y: 14, w: 1, h: 1 },
      },
    },
    {
      id: '38',
      title: 'VPN',
      content: 'ON',
      color: '#DEE2E6',
      layouts: {
        sm: { x: 2, y: 27, w: 1, h: 1 },
        md: { x: 2, y: 17, w: 1, h: 1 },
        lg: { x: 8, y: 16, w: 1, h: 1 },
        xl: { x: 7, y: 14, w: 1, h: 1 },
      },
    },
    {
      id: '39',
      title: 'WIFI',
      content: 'ON',
      color: '#E9ECEF',
      layouts: {
        sm: { x: 1, y: 28, w: 1, h: 1 },
        md: { x: 3, y: 17, w: 1, h: 1 },
        lg: { x: 9, y: 16, w: 1, h: 1 },
        xl: { x: 8, y: 14, w: 1, h: 1 },
      },
    },
    {
      id: '40',
      title: 'HOT',
      content: 'OFF',
      color: '#E9ECEF',
      layouts: {
        sm: { x: 2, y: 28, w: 1, h: 1 },
        md: { x: 4, y: 17, w: 1, h: 1 },
        lg: { x: 10, y: 16, w: 1, h: 1 },
        xl: { x: 9, y: 14, w: 1, h: 1 },
      },
    },
    {
      id: '41',
      title: 'AIR',
      content: 'OFF',
      color: '#E9ECEF',
      layouts: {
        sm: { x: 1, y: 29, w: 1, h: 1 },
        md: { x: 5, y: 17, w: 1, h: 1 },
        lg: { x: 11, y: 16, w: 1, h: 1 },
        xl: { x: 10, y: 14, w: 1, h: 1 },
      },
    },
    {
      id: '42',
      title: 'LOC',
      content: 'ON',
      color: '#E9ECEF',
      layouts: {
        sm: { x: 2, y: 29, w: 1, h: 1 },
        md: { x: 6, y: 17, w: 1, h: 1 },
        lg: { x: 12, y: 16, w: 1, h: 1 },
        xl: { x: 11, y: 14, w: 1, h: 1 },
      },
    },

    // --- SECTION 6: PRODUCTIVITY (Lists) ---
    // Big wide blocks at the bottom
    {
      id: '43',
      title: 'Todo',
      content: '1. Fix Bugs',
      color: '#FFD43B',
      layouts: {
        sm: { x: 1, y: 30, w: 2, h: 1 },
        md: { x: 1, y: 18, w: 3, h: 2 },
        lg: { x: 1, y: 18, w: 4, h: 2 },
        xl: { x: 1, y: 16, w: 6, h: 2 },
      },
    },
    {
      id: '44',
      title: 'Done',
      content: '1. Sleep',
      color: '#FFE066',
      layouts: {
        sm: { x: 1, y: 31, w: 2, h: 1 },
        md: { x: 4, y: 18, w: 3, h: 2 },
        lg: { x: 5, y: 18, w: 4, h: 2 },
        xl: { x: 7, y: 16, w: 6, h: 2 },
      },
    },
    {
      id: '45',
      title: 'Notes',
      content:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
      color: '#FCC419',
      layouts: {
        sm: { x: 1, y: 32, w: 2, h: 1 },
        md: { x: 1, y: 20, w: 6, h: 2 },
        lg: { x: 9, y: 18, w: 4, h: 2 },
        xl: { x: 13, y: 16, w: 6, h: 2 },
      },
    },

    // --- SECTION 7: FOOTER & STATUS ---
    {
      id: '46',
      title: 'System Status',
      content: 'All Systems Operational',
      color: '#212529',
      layouts: {
        sm: { x: 1, y: 33, w: 2, h: 1 },
        md: { x: 1, y: 22, w: 4, h: 1 },
        lg: { x: 1, y: 21, w: 8, h: 1 },
        xl: { x: 1, y: 19, w: 12, h: 1 },
      },
    },
    {
      id: '47',
      title: 'Power',
      content: 'AC Plugged',
      color: '#343A40',
      layouts: {
        sm: { x: 1, y: 34, w: 1, h: 1 },
        md: { x: 5, y: 22, w: 1, h: 1 },
        lg: { x: 9, y: 21, w: 2, h: 1 },
        xl: { x: 13, y: 19, w: 6, h: 1 },
      },
    },
    {
      id: '48',
      title: 'Batt',
      content: '100%',
      color: '#343A40',
      layouts: {
        sm: { x: 2, y: 34, w: 1, h: 1 },
        md: { x: 6, y: 22, w: 1, h: 1 },
        lg: { x: 11, y: 21, w: 2, h: 1 },
        xl: { x: 19, y: 19, w: 6, h: 1 },
      },
    },

    // --- EXTRAS FOR FILLING OR SPECIFIC VIEWS ---
    {
      id: '49',
      title: 'Z',
      content: '.',
      color: '#F8F9FA',
      layouts: {
        sm: { x: 1, y: 35, w: 1, h: 1 },
        md: { x: 1, y: 23, w: 1, h: 1 },
        lg: { x: 1, y: 22, w: 1, h: 1 },
        xl: { x: 19, y: 16, w: 2, h: 2 },
      },
    },
    {
      id: '50',
      title: 'X',
      content: '.',
      color: '#F8F9FA',
      layouts: {
        sm: { x: 2, y: 35, w: 1, h: 1 },
        md: { x: 2, y: 23, w: 1, h: 1 },
        lg: { x: 2, y: 22, w: 1, h: 1 },
        xl: { x: 21, y: 16, w: 2, h: 2 },
      },
    },
    {
      id: '51',
      title: 'Y',
      content: '.',
      color: '#F8F9FA',
      layouts: {
        sm: { x: 1, y: 36, w: 1, h: 1 },
        md: { x: 3, y: 23, w: 1, h: 1 },
        lg: { x: 3, y: 22, w: 1, h: 1 },
        xl: { x: 23, y: 16, w: 2, h: 2 },
      },
    },
  ];

  $: bpKey = (
    innerWidth < 768 ? 'sm' : innerWidth < 1280 ? 'md' : innerWidth < 1600 ? 'lg' : 'xl'
  ) as keyof CardData['layouts'];
  $: totalCols = bpKey === 'sm' ? 2 : bpKey === 'md' ? 6 : bpKey === 'lg' ? 12 : 24;

  // THE ENGINE: Recalculates Y positions every time a height changes
  $: {
    // 1. Sort by Y to ensure we process top-down
    const sorted = [...cardData].sort((a, b) => a.layouts[bpKey].y - b.layouts[bpKey].y);

    // Track "Push" for every column
    let columnPushes = new Array(totalCols + 1).fill(0);
    let newLayouts: Record<string, any> = {};

    sorted.forEach((card) => {
      const l = card.layouts[bpKey];

      // Calculate how much the items ABOVE this card in its columns have grown
      let currentPush = 0;
      for (let i = l.x; i < l.x + l.w; i++) {
        currentPush = Math.max(currentPush, columnPushes[i]);
      }

      const originalStart = (l.y - 1) * scale + 1;
      const startRow = originalStart + currentPush;

      const minSpan = l.h * scale;
      const measuredH = measuredHeights[card.id] || 0;
      const contentSpan = Math.ceil((measuredH + gap) / (baseUnit + gap));
      const actualSpan = Math.max(minSpan, contentSpan);

      // Add the "New Growth" to the column push trackers for items further down
      const growthAdded = actualSpan - minSpan;
      for (let i = l.x; i < l.x + l.w; i++) {
        columnPushes[i] += growthAdded;
      }

      newLayouts[card.id] = { start: startRow, span: actualSpan, push: currentPush };
    });
    calculatedLayouts = newLayouts;
  }
</script>

<svelte:window bind:innerWidth />

<div class="app-container">
  <header class="main-header">
    <div class="branding">
      <h1 class="logo">Arch_Bento_v5</h1>
      <div class="status-badges">
        <span class="badge">{bpKey.toUpperCase()}</span>
        <span class="badge">COLS: {totalCols}</span>
      </div>
    </div>
    <div class="controls">
      <label>Unit: <input type="range" bind:value={baseUnit} min="10" max="40" /></label>
      <label>Gap: <input type="range" bind:value={gap} min="0" max="20" /></label>
      <label class="check"><input type="checkbox" bind:checked={showGrid} /> Debug</label>
    </div>
  </header>

  <main
    class="bento-grid"
    class:debug-grid={showGrid}
    style="--unit: {baseUnit}px; --gap: {gap}px; --cols: {totalCols};"
  >
    {#each cardData as card (card.id)}
      {@const l = card.layouts[bpKey]}
      {@const calc = calculatedLayouts[card.id] || { start: 1, span: 5 }}

      <div
        class="card"
        style="
          background-color: {card.color};
          grid-column: {l.x} / span {l.w};
          grid-row: {calc.start} / span {calc.span};
        "
      >
        <div class="card-inner" bind:clientHeight={measuredHeights[card.id]}>
          <div class="card-header">
            <span class="id-tag">#{card.id}</span>
            <div class="debug-info">Y:{calc.start} | P:+{calc.push}</div>
          </div>
          <div class="content-wrapper">
            <h2 class="card-title">{card.title}</h2>
            <div class="card-content" contenteditable="true" bind:textContent={card.content}>
              {card.content}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </main>
</div>

<style>
  :global(body) {
    background-color: #e4e4e7;
    font-family: 'Iosevka Term', monospace;
    margin: 0;
    padding: 2rem;
  }

  .main-header {
    background: #fff;
    border: 4px solid #000;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 4px 4px 0px #000;
    margin-bottom: 2rem;
  }

  .logo {
    font-style: italic;
    font-weight: 900;
    margin: 0;
  }
  .badge {
    background: #000;
    color: #fff;
    padding: 2px 6px;
    font-size: 10px;
    margin-right: 5px;
  }
  .controls {
    display: flex;
    gap: 1rem;
    font-size: 10px;
    font-weight: 900;
  }

  .bento-grid {
    display: grid;
    gap: var(--gap);
    grid-template-columns: repeat(var(--cols), 1fr);
    grid-auto-rows: var(--unit);
  }

  .debug-grid {
    background-image:
      linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
      linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    background-size: 100% calc(var(--unit) + var(--gap));
  }

  .card {
    border: 3px solid #000;
    box-shadow: 4px 4px 0px #000;
    transition: grid-row 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: #fff;
  }

  .card-inner {
    padding: 1rem;
    height: fit-content;
    min-height: 100%;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .id-tag {
    background: #000;
    color: #fff;
    padding: 2px 4px;
    font-size: 9px;
  }
  .debug-info {
    font-size: 9px;
    opacity: 0.5;
    font-weight: bold;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
  }
  .card-content {
    font-size: 0.85rem;
    line-height: 1.4;
    outline: none;
    white-space: pre-wrap;
    margin-top: 0.5rem;
  }
</style>
