
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import BackToTop from '@/components/BackToTop';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <Card className="border border-white/10 bg-slate-900/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6 md:p-10">
            <h1 className="text-3xl font-bold mb-8 text-yellow-400">Kebijakan Privasi</h1>
            
            <div className="space-y-6 text-gray-300">
              <p>
                Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">1. Pendahuluan</h2>
              <p>
                Betterworks.id ("kami", "milik kami", atau "kita") menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. 
                Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang Anda berikan saat 
                menggunakan layanan kami.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">2. Informasi yang Kami Kumpulkan</h2>
              <p>
                Kami dapat mengumpulkan beberapa jenis informasi dari pengguna layanan kami, termasuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informasi identitas (nama, alamat email, nomor telepon)</li>
                <li>Informasi bisnis (nama perusahaan, jenis produk, jumlah karyawan, lokasi)</li>
                <li>Informasi teknis (alamat IP, jenis perangkat, data penggunaan)</li>
                <li>Informasi penggunaan (cara Anda berinteraksi dengan layanan kami)</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-white mt-6">3. Bagaimana Kami Menggunakan Informasi Anda</h2>
              <p>
                Kami menggunakan informasi yang kami kumpulkan untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menyediakan dan mengelola layanan yang Anda minta</li>
                <li>Meningkatkan dan mengoptimalkan layanan kami</li>
                <li>Berkomunikasi dengan Anda mengenai produk atau layanan kami</li>
                <li>Memberikan dukungan pelanggan</li>
                <li>Menganalisis penggunaan layanan untuk pengembangan lebih lanjut</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-white mt-6">4. Penyimpanan dan Keamanan Data</h2>
              <p>
                Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses yang tidak sah atau 
                pengungkapan. Data disimpan pada server dengan keamanan yang ketat dan hanya dapat diakses oleh personel yang berwenang.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">5. Berbagi Informasi dengan Pihak Ketiga</h2>
              <p>
                Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Kami mungkin membagikan informasi Anda dalam keadaan berikut:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dengan penyedia layanan yang bekerja sama dengan kami dalam operasi bisnis</li>
                <li>Jika diwajibkan oleh hukum atau dalam proses hukum</li>
                <li>Untuk melindungi hak, properti, atau keselamatan kami, pengguna kami, atau publik</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-white mt-6">6. Hak Privasi Anda</h2>
              <p>
                Anda memiliki hak untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mengakses data pribadi yang kami miliki tentang Anda</li>
                <li>Meminta koreksi data yang tidak akurat</li>
                <li>Meminta penghapusan data Anda (dengan batasan tertentu)</li>
                <li>Membatasi atau menolak pemrosesan data Anda</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-white mt-6">7. Cookie dan Teknologi Pelacakan</h2>
              <p>
                Kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman pengguna, menganalisis tren, 
                dan mengelola situs web. Anda dapat mengontrol penggunaan cookie melalui pengaturan browser Anda.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">8. Perubahan pada Kebijakan Privasi</h2>
              <p>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik kami atau 
                untuk alasan hukum, operasional, atau peraturan lainnya. Perubahan signifikan akan diberitahukan melalui email atau 
                pemberitahuan di situs web kami.
              </p>
              
              <h2 className="text-xl font-semibold text-white mt-6">9. Menghubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi kami atau cara kami menangani data Anda, 
                silakan hubungi kami di:
              </p>
              <p className="mt-2">
                Email: hello@betterworks.id<br />
                Alamat: Jl. Siliwangi Q No.1, Depok, Jawa Barat 16431
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
      <BackToTop />
      <Toaster />
    </div>
  );
};

export default PrivacyPolicy;
