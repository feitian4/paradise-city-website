import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 50%, #0A0A0F 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* 金色边框 */}
        <div style={{
          position: 'absolute', inset: 20,
          border: '2px solid rgba(212,175,55,0.4)',
          borderRadius: 16,
        }} />

        {/* 藏文符号 */}
        <div style={{ fontSize: 48, marginBottom: 16, color: 'rgba(212,175,55,0.6)' }}>☸</div>

        {/* 主标题 */}
        <div style={{ fontSize: 72, fontWeight: 'bold', color: '#D4AF37', marginBottom: 12 }}>
          香格里拉天堂之城
        </div>

        {/* 英文副标题 */}
        <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
          Paradise City
        </div>

        {/* Slogan */}
        <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.4)', letterSpacing: 4 }}>
          通往内心宁静之门 · Your Portal to Inner Peace
        </div>

        {/* 底部标签 */}
        <div style={{
          position: 'absolute', bottom: 48,
          display: 'flex', gap: 24,
        }}>
          {['NFT护法', '$SHANGRI代币', '元宇宙净土', '藏医药疗愈'].map(tag => (
            <div key={tag} style={{
              background: 'rgba(212,175,55,0.15)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 20,
              padding: '6px 16px',
              color: '#D4AF37',
              fontSize: 16,
            }}>{tag}</div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
