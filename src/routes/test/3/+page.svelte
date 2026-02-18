<script lang="ts">
  // CONFIGURATION
  let baseUnit = 100;
  let gap = 8;
  let showGrid = false;

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

  let innerWidth = 0;
  $: bpKey = (
    innerWidth < 768 ? 'sm' : innerWidth < 1280 ? 'md' : innerWidth < 1600 ? 'lg' : 'xl'
  ) as keyof CardData['layouts'];
  $: totalCols = bpKey === 'sm' ? 2 : bpKey === 'md' ? 6 : bpKey === 'lg' ? 12 : 24;
</script>

<svelte:window bind:innerWidth />

<div class="app-container">
  <header class="main-header">
    <div class="branding">
      <h1 class="logo">Arch_Bento_v4</h1>
      <div class="status-badges">
        <span class="badge">VIEWPORT: <strong>{bpKey.toUpperCase()}</strong></span>
        <span class="badge">COLS: <strong>{totalCols}</strong></span>
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <label>Unit ({baseUnit}px)</label>
        <input type="range" bind:value={baseUnit} min="40" max="100" />
      </div>
      <div class="control-group">
        <label>Gap ({gap}px)</label>
        <input type="range" bind:value={gap} min="0" max="40" />
      </div>
      <label class="checkbox-label">
        <input type="checkbox" bind:checked={showGrid} />
        Debug Grid
      </label>
    </div>
  </header>

  <main
    class="bento-grid"
    class:debug-grid={showGrid}
    style="--unit: {baseUnit}px; --gap: {gap}px; --cols: {totalCols};"
  >
    {#each cardData as card (card.id)}
      {@const layout = card.layouts[bpKey]}
      <div
        class="card"
        style="
            background-color: {card.color};
            --c-x: {layout.x}; --c-y: {layout.y};
            --c-w: {layout.w}; --c-h: {layout.h};
          "
      >
        <div class="card-inner">
          <div class="card-header">
            <span class="id-tag">#{card.id}</span>
            <div class="layout-info">
              {layout.x},{layout.y} [{layout.w}x{layout.h}]
            </div>
          </div>
          <div class="content-wrapper">
            <h2 class="card-title">{card.title}</h2>
            <p class="card-content">{card.content}</p>
          </div>
        </div>
      </div>
    {/each}
  </main>
</div>

<style>
  :global(body) {
    background-color: #e4e4e7;
    background-image: radial-gradient(#1a1d23 1px, transparent 1px);
    background-size: 20px 20px;
    margin: 0;
    font-family: 'Iosevka Term', monospace;
    color: #0f1115;
  }

  .app-container {
    padding: 2rem;
    max-width: 2500px;
    margin: 0 auto;
    min-height: 100vh;
  }

  /* --- HEADER STYLES --- */
  .main-header {
    position: sticky;
    top: 0;
    z-index: 100;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background: #ffffff;
    color: #000000;
    padding: 1.5rem;
    border: 4px solid #000;
    box-shadow: 4px 4px 0px 0px black; /* Arch Blue Shadow */
  }

  @media (min-width: 768px) {
    .main-header {
      flex-direction: row;
      align-items: center;
    }
  }

  .logo {
    margin: 0;
    font-size: 2rem;
    font-weight: 900;
    text-transform: uppercase;
    font-style: italic;
    text-decoration: underline;
  }

  .status-badges {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .badge {
    font-size: 0.7rem;
    background: #000;
    color: #fff;
    padding: 0.2rem 0.5rem;
    font-weight: bold;
  }

  .controls {
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .control-group label {
    display: block;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    border-left: 2px solid #ddd;
    padding-left: 1rem;
    cursor: pointer;
  }

  /* --- GRID SYSTEM --- */
  .bento-grid {
    display: grid;
    gap: var(--gap);
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
    grid-auto-rows: var(--unit);
    transition: all 0.3s ease;
  }

  .debug-grid {
    background-image:
      linear-gradient(to right, black 2px, transparent 1px), linear-gradient(to bottom, black 2px, transparent 1px);
    background-size: calc((100% - (var(--gap) * (var(--cols) - 1))) / var(--cols) + var(--gap))
      calc(var(--unit) + var(--gap));
    outline: 4px dashed #1793d1;
  }

  /* --- CARD STYLES --- */
  .card {
    border: 3px solid #000;
    box-shadow: 4px 4px 0px #000;
    grid-column: var(--c-x) / span var(--c-w);
    grid-row: var(--c-y) / span var(--c-h);
    transition:
      transform 0.1s,
      box-shadow 0.1s,
      grid-area 0.4s;
    overflow: hidden;
    position: relative;
    color: #000; /* Content is dark by default for the bright card colors */
  }

  .card:hover {
    /* transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px #000; */
    z-index: 50;
  }

  .card-inner {
    padding: 0.75rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .id-tag {
    background: #000;
    color: #fff;
    padding: 2px 4px;
    font-size: 10px;
    font-weight: bold;
  }

  .layout-info {
    font-size: 9px;
    font-weight: 800;
    opacity: 0.6;
    background: rgba(255, 255, 255, 0.2);
    padding: 1px 3px;
    border-radius: 2px;
  }

  .content-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  .card-title {
    font-size: clamp(0.75rem, 1.5vw, 1.25rem);
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
  }

  .card-content {
    font-size: 0.7rem;
    font-weight: 700;
    margin: 4px 0 0 0;
    opacity: 0.8;
  }
</style>
