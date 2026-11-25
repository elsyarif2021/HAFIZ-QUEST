# Hafiz Quest

Game latihan tahfiz Juz 30 dalam bahasa Indonesia. Tersedia 37 surah, 564 ayat, delapan mode latihan, duel dua pemain pada satu perangkat, mushaf, dan rapor evaluasi santri.

## Menjalankan

Buka `index.html` di browser. Untuk menguji melalui server lokal, jalankan `python3 -m http.server 8000` dari folder repositori lalu buka `http://localhost:8000`.

Teks, gaya, dan font sudah ada di dalam HTML. Audio tilawah Mishary Alafasy memerlukan koneksi internet.

## Hosting di Vercel

Impor repositori GitHub ini sebagai proyek baru di [Vercel](https://vercel.com/new). Pilih preset **Other**, pakai direktori akar repositori, lalu klik **Deploy**. Berkas `index.html` siap dilayani sebagai situs statis tanpa proses build atau variabel lingkungan.

## Penyimpanan data dan integrasi Supabase

Versi ini menyimpan data di `localStorage` per browser dan per alamat situs. Untuk integrasi berikutnya, gunakan kelompok data berikut sebagai titik awal.

| Data | Kunci lokal |
| --- | --- |
| Nama santri, kelas atau halaqah, pembimbing | `hq_profile` |
| XP dan daftar surah selesai | `hq_xp`, `hq_completed` |
| Jumlah percobaan, jawaban benar, catatan murajaah | `hq_attempts`, `hq_correct`, `hq_weak_verses` |
| Target dan klaim harian | `hq_daily` |

Saat menghubungkan [Supabase](https://supabase.com/), gunakan Auth dan kebijakan Row Level Security untuk membatasi akses data masing-masing santri. Data lokal lama perlu dimigrasikan secara eksplisit jika ingin tersedia lintas perangkat. Gunakan kunci publishable pada frontend dan simpan kunci service role di server.

## Sumber

- Teks Juz 30 edisi `quran-uthmani` dari [Al Quran Cloud](https://api.alquran.cloud/v1/juz/30/quran-uthmani).
- Audio Mishary Alafasy dari [Islamic Network](https://islamic.network/).
- Lisensi font yang disertakan dapat ditemukan di bagian akhir `index.html`.
