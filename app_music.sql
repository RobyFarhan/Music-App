-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Sep 2021 pada 04.45
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_music`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_artist`
--

CREATE TABLE `tb_artist` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `start_career` date NOT NULL,
  `image` varchar(255) NOT NULL,
  `about` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_artist`
--

INSERT INTO `tb_artist` (`id`, `name`, `start_career`, `image`, `about`, `created_at`, `updated_at`) VALUES
(1, 'Raisa Andriana', '0000-00-00', '1631067220372-raisa.jpg', 'better known by her mononym Raisa (born in Jakarta on 6 June 1990), is an Indonesian singer and songwriter', '2021-09-08 09:02:49', '2021-09-08 09:02:49'),
(2, 'Tulus', '2021-09-12', 'tulus.jpg', 'Menyanyikan lagu Sewindu', '2021-09-08 09:02:49', '2021-09-08 09:02:49'),
(3, 'Madison Beer', '2021-09-26', '1631088391720-madison.jpg', 'Madison Elle Beer is an American singer, songwriter and internet personality. Born to a Jewish family in New York, she began posting covers to YouTube in early 2012. ', '2021-09-08 15:06:31', '2021-09-08 15:06:31'),
(5, 'Jamie Miller', '0000-00-00', '1631364268529-jamie.jpg', 'Jamie Miller is a Welsh musician, now based in Los Angeles, United States. He featured on The Voice UK in 2017, where he came in third place.', '2021-09-11 19:44:28', '2021-09-11 19:44:28'),
(6, 'Noah', '0000-00-00', '1631364324721-noah.jpg', 'Noah adalah sebuah grup musik rock alternatif dari Indonesia. Grup musik ini dibentuk dengan nama Peterpan oleh Ariel, Andika, Indra, Lukman, Reza dan Uki pada tanggal 1 September 2000.', '2021-09-11 19:45:24', '2021-09-11 19:45:24'),
(7, 'Yura Yunitaa', '0000-00-00', '1631364351292-1630983200328-yura.jpg', 'Pernah berduet dengan Glenn Fredly', '2021-09-11 19:45:51', '2021-09-11 19:45:51'),
(8, 'Nagita Slavina', '2021-02-02', '1631365757132-nagita.jpg', 'Istri Raffi Ahmad', '2021-09-11 20:09:17', '2021-09-11 20:09:17'),
(9, 'Didi Kempot', '2021-09-01', '1631515608695-didikempot.jpg', 'Penyanyi Senior dari Jawa', '2021-09-13 13:46:48', '2021-09-13 13:46:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_genre`
--

CREATE TABLE `tb_genre` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_music`
--

CREATE TABLE `tb_music` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `music` varchar(255) NOT NULL,
  `cover_music` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `genre_id` int(11) DEFAULT NULL,
  `artist_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_music`
--

INSERT INTO `tb_music` (`id`, `title`, `music`, `cover_music`, `created_at`, `updated_at`, `genre_id`, `artist_id`) VALUES
(1, 'Menghapus Jejakmu', 'Menghapus_Jejakmu.mp3', 'noah.jpg', '2021-09-08 09:05:07', '2021-09-08 09:05:07', NULL, 6),
(2, 'Merakit', 'merakit.mp3', 'yura.jpg', '2021-09-08 09:05:07', '2021-09-08 09:05:07', NULL, 7),
(3, 'Love and Let Go', 'loveandletgo.mp3', 'raisa.jpg', '2021-09-08 12:11:26', '2021-09-08 12:11:26', NULL, 1),
(4, 'Manusia Kuat', 'manusiakuat.mp3', 'tulus.jpg', '2021-09-08 12:11:26', '2021-09-08 12:11:26', NULL, 2),
(5, 'Reckless', 'reckless.mp3', 'madison.jpg', '2021-09-08 12:12:36', '2021-09-08 12:12:36', NULL, 3),
(6, 'Heres Your Perfect', 'heresyourperfect.mp3', 'jamie.jpg', '2021-09-08 12:12:36', '2021-09-08 12:12:36', NULL, 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_playlist`
--

CREATE TABLE `tb_playlist` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `music_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `status` bit(2) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_user`
--

INSERT INTO `tb_user` (`id`, `username`, `email`, `password`, `status`, `created_at`, `updated_at`) VALUES
(1, 'roby_farhan', 'rob@gmail.com', 'roby', NULL, '2021-09-08 09:11:27', '2021-09-08 09:11:27'),
(2, 'admin', 'rob@gmail.com', '1234', NULL, '2021-09-08 16:32:05', '2021-09-08 16:32:05');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tb_artist`
--
ALTER TABLE `tb_artist`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_genre`
--
ALTER TABLE `tb_genre`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_music`
--
ALTER TABLE `tb_music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_tb_genre` (`genre_id`),
  ADD KEY `FK_tb_artist` (`artist_id`);

--
-- Indeks untuk tabel `tb_playlist`
--
ALTER TABLE `tb_playlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_tb_music` (`music_id`),
  ADD KEY `FK_tb_user` (`user_id`);

--
-- Indeks untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tb_artist`
--
ALTER TABLE `tb_artist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `tb_genre`
--
ALTER TABLE `tb_genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tb_music`
--
ALTER TABLE `tb_music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `tb_playlist`
--
ALTER TABLE `tb_playlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tb_music`
--
ALTER TABLE `tb_music`
  ADD CONSTRAINT `FK_tb_artist` FOREIGN KEY (`artist_id`) REFERENCES `tb_artist` (`id`),
  ADD CONSTRAINT `FK_tb_genre` FOREIGN KEY (`genre_id`) REFERENCES `tb_genre` (`id`);

--
-- Ketidakleluasaan untuk tabel `tb_playlist`
--
ALTER TABLE `tb_playlist`
  ADD CONSTRAINT `FK_tb_music` FOREIGN KEY (`music_id`) REFERENCES `tb_music` (`id`),
  ADD CONSTRAINT `FK_tb_user` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
