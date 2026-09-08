import React, { useState, useEffect } from 'react';
import { Search, Clock, Train, Calendar, AlertCircle } from 'lucide-react';

const INITIAL_SCHEDULE = [
  { id: 1, name: "Maradana → Rambukkana", frequency: "Daily", arrival: "02:18 am", departure: "02:19 am" },
  { id: 2, name: "Night Mail (Trincomalee → Colombo Fort)", frequency: "Daily", arrival: "03:00 am", departure: "03:03 am" },
  { id: 3, name: "Colombo Fort → Veyangoda", frequency: "Daily", arrival: "03:29 am", departure: "03:30 am" },
  { id: 4, name: "Night Mail (Kankesanthurai → Colombo Fort)", frequency: "Daily", arrival: "03:30 am", departure: "03:33 am" },
  { id: 5, name: "Colombo Fort → Polgahawela", frequency: "Daily", arrival: "03:51 am", departure: "03:52 am" },
  { id: 6, name: "Colombo Fort → Nooranagar", frequency: "Daily", arrival: "04:31 am", departure: "04:32 am" },
  { id: 7, name: "Night Mail (Badulla → Colombo Fort)", frequency: "Daily", arrival: "04:48 am", departure: "04:52 am" },
  { id: 8, name: "Polgahawela → Maradana", frequency: "Daily", arrival: "05:04 am", departure: "05:14 am" },
  { id: 9, name: "Colombo Fort → Rambukkana", frequency: "Daily", arrival: "05:04 am", departure: "05:05 am" },
  { id: 10, name: "Rambukkana → Colombo Fort", frequency: "Sunday Only", arrival: "05:23 am", departure: "05:24 am" },
  { id: 11, name: "Rambukkana → Maradana", frequency: "Weekdays and Saturday Only", arrival: "05:23 am", departure: "05:24 am" },
  { id: 12, name: "Colombo Fort → Negombo", frequency: "Weekdays and Saturday Only", arrival: "05:31 am", departure: "05:32 am" },
  { id: 13, name: "Colombo Fort → Ambeypussa", frequency: "Daily", arrival: "05:38 am", departure: "05:39 am" },
  { id: 14, name: "Chilaw → Maradana", frequency: "Daily", arrival: "05:54 am", departure: "05:58 am" },
  { id: 15, name: "Veyangoda → Colombo Fort", frequency: "Daily", arrival: "05:54 am", departure: "05:55 am" },
  { id: 16, name: "Polgahawela → Colombo Fort", frequency: "Saturday and Sunday Only", arrival: "06:00 am", departure: "06:02 am" },
  { id: 17, name: "Rambukkana → Colombo Fort", frequency: "Weekdays Only", arrival: "06:00 am", departure: "06:02 am" },
  { id: 18, name: "Aluthgama → Chilaw", frequency: "Daily", arrival: "06:06 am", departure: "06:07 am" },
  { id: 19, name: "Colombo Fort → Badulla", frequency: "Daily", arrival: "06:16 am", departure: "06:18 am" },
  { id: 20, name: "Maradana → Polgahawela", frequency: "Daily", arrival: "06:19 am", departure: "06:29 am" },
  { id: 21, name: "Mirigama → Colombo Fort", frequency: "Sunday Only", arrival: "06:25 am", departure: "06:26 am" },
  { id: 22, name: "Ganewatte → Maradana", frequency: "Weekdays and Saturday Only", arrival: "06:26 am", departure: "06:28 am" },
  { id: 23, name: "Udaya Devi (Colombo Fort → Batticaloa)", frequency: "Daily", arrival: "06:26 am", departure: "06:27 am" },
  { id: 24, name: "Chilaw → Colombo Fort", frequency: "Saturday Only", arrival: "06:33 am", departure: "06:34 am" },
  { id: 25, name: "Chilaw → Maradana", frequency: "Weekdays Only", arrival: "06:33 am", departure: "06:34 am" },
  { id: 26, name: "Rambukkana → Colombo Fort", frequency: "Sunday Only", arrival: "06:43 am", departure: "06:49 am" },
  { id: 27, name: "Rambukkana → Maradana", frequency: "Saturday Only", arrival: "06:43 am", departure: "06:49 am" },
  { id: 28, name: "Rambukkana → Maradana", frequency: "Weekdays Only", arrival: "06:43 am", departure: "06:49 am" },
  { id: 29, name: "Colombo Fort → Gampaha", frequency: "Weekdays and Saturday Only", arrival: "06:45 am", departure: "06:59 am" },
  { id: 30, name: "Yal Devi (Mount Lavinia → Kankesanthurai)", frequency: "Daily", arrival: "06:56 am", departure: "06:57 am" },
  { id: 31, name: "Polgahawela → Colombo Fort", frequency: "Weekdays Only", arrival: "07:00 am", departure: "07:02 am" },
  { id: 32, name: "Polgahawela → Colombo Fort", frequency: "Saturday and Sunday Only", arrival: "07:05 am", departure: "07:06 am" },
  { id: 33, name: "Polgahawela → Maradana", frequency: "Weekdays Only", arrival: "07:05 am", departure: "07:06 am" },
  { id: 34, name: "Colombo Fort → Ragama", frequency: "Weekdays and Saturday Only", arrival: "07:09 am", departure: "07:09 am" },
  { id: 35, name: "Muthu Kumari (Chilaw → Panadura)", frequency: "Weekdays Only", arrival: "07:09 am", departure: "07:10 am" },
  { id: 36, name: "Rambukkana → Maradana", frequency: "Weekdays and Saturday Only", arrival: "07:14 am", departure: "07:18 am" },
  { id: 37, name: "Maho → Colombo Fort", frequency: "Saturday and Sunday Only", arrival: "07:14 am", departure: "07:15 am" },
  { id: 38, name: "Ragama → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "07:25 am", departure: "07:25 am" },
  { id: 39, name: "Rambukkana → Colombo Fort", frequency: "Sunday Only", arrival: "07:27 am", departure: "07:28 am" },
  { id: 40, name: "Colombo Fort → Gampaha", frequency: "Weekdays Only", arrival: "07:27 am", departure: "07:28 am" },
  { id: 41, name: "Mirigama → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "07:33 am", departure: "07:35 am" },
  { id: 42, name: "Colombo Fort → Rambukkana", frequency: "Daily", arrival: "07:36 am", departure: "07:37 am" },
  { id: 43, name: "Colombo Fort → Negombo", frequency: "Weekdays Only", arrival: "07:38 am", departure: "07:39 am" },
  { id: 44, name: "Negombo → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "07:38 am", departure: "07:46 am" },
  { id: 45, name: "Colombo Fort → Ragama", frequency: "Weekdays Only", arrival: "07:45 am", departure: "07:45 am" },
  { id: 46, name: "Maho → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "07:49 am", departure: "07:50 am" },
  { id: 47, name: "Gampaha → Colombo Fort", frequency: "Saturday Only", arrival: "07:56 am", departure: "07:57 am" },
  { id: 48, name: "Gampaha → Colombo Fort", frequency: "Weekdays Only", arrival: "07:56 am", departure: "07:57 am" },
  { id: 49, name: "Ragama → Colombo Fort", frequency: "Weekdays Only", arrival: "07:57 am", departure: "07:57 am" },
  { id: 50, name: "Colombo Fort → Mirigama", frequency: "Weekdays Only", arrival: "07:59 am", departure: "08:00 am" },
  { id: 51, name: "Polgahawela → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "08:04 am", departure: "08:05 am" },
  { id: 52, name: "Puttalam → Maradana", frequency: "Sunday Only", arrival: "08:06 am", departure: "08:07 am" },
  { id: 53, name: "Polgahawela → Colombo Fort", frequency: "Sunday Only", arrival: "08:07 am", departure: "08:08 am" },
  { id: 54, name: "Gampaha → Colombo Fort", frequency: "Weekdays Only", arrival: "08:17 am", departure: "08:18 am" },
  { id: 55, name: "Colombo Fort → Puttalam", frequency: "Daily", arrival: "08:18 am", departure: "08:23 am" },
  { id: 56, name: "Chilaw → Colombo Fort", frequency: "Daily", arrival: "08:24 am", departure: "08:31 am" },
  { id: 57, name: "Colombo Fort → Negombo", frequency: "Weekdays Only", arrival: "08:26 am", departure: "08:28 am" },
  { id: 58, name: "Colombo Fort → Rambukkana", frequency: "Daily", arrival: "08:29 am", departure: "08:30 am" },
  { id: 59, name: "Ambeypussa → Colombo Fort", frequency: "Daily", arrival: "08:39 am", departure: "08:40 am" },
  { id: 60, name: "Colombo Fort → Badulla", frequency: "Daily", arrival: "08:50 am", departure: "08:51 am" },
  { id: 61, name: "Colombo Fort → Mirigama", frequency: "Weekdays Only", arrival: "08:59 am", departure: "09:00 am" },
  { id: 62, name: "Rambukkana → Colombo Fort", frequency: "Daily", arrival: "09:15 am", departure: "09:22 am" },
  { id: 63, name: "Kandy → Colombo Fort", frequency: "Daily", arrival: "09:19 am", departure: "09:20 am" },
  { id: 64, name: "Colombo Fort → Rambukkana", frequency: "Daily", arrival: "09:26 am", departure: "09:27 am" },
  { id: 65, name: "Colombo Fort → Kurunegala", frequency: "Daily", arrival: "09:26 am", departure: "09:27 am" },
  { id: 66, name: "Intercity (Colombo Fort → Anuradhapura)", frequency: "Saturday Only", arrival: "09:40 am", departure: "09:41 am" },
  { id: 67, name: "Vavuniya → Colombo Fort", frequency: "Daily", arrival: "09:52 am", departure: "09:54 am" },
  { id: 68, name: "Colombo Fort → Mirigama", frequency: "Weekdays Only", arrival: "09:52 am", departure: "09:53 am" },
  { id: 69, name: "Mirigama → Colombo Fort", frequency: "Weekdays Only", arrival: "10:01 am", departure: "10:02 am" },
  { id: 70, name: "Colombo Fort → Badulla", frequency: "Daily", arrival: "10:06 am", departure: "10:07 am" },
  { id: 71, name: "Colombo Fort → Chilaw", frequency: "Daily", arrival: "10:06 am", departure: "10:07 am" },
  { id: 72, name: "Negombo → Colombo Fort", frequency: "Weekdays Only", arrival: "10:18 am", departure: "10:19 am" },
  { id: 73, name: "Polgahawela → Colombo Fort", frequency: "Daily", arrival: "10:32 am", departure: "10:33 am" },
  { id: 74, name: "Colombo Fort → Rambukkana", frequency: "Daily", arrival: "10:39 am", departure: "10:40 am" },
  { id: 75, name: "Matale → Colombo Fort", frequency: "Saturday Only", arrival: "10:49 am", departure: "10:50 am" },
  { id: 76, name: "Colombo Fort → Kandy", frequency: "Saturday and Sunday Only", arrival: "10:56 am", departure: "10:57 am" },
  { id: 77, name: "Colombo Fort → Matale", frequency: "Weekdays Only", arrival: "10:56 am", departure: "10:57 am" },
  { id: 78, name: "Mirigama → Colombo Fort", frequency: "Daily", arrival: "11:12 am", departure: "11:13 am" },
  { id: 79, name: "Chilaw → Colombo Fort", frequency: "Daily", arrival: "11:14 am", departure: "11:15 am" },
  { id: 80, name: "Mirigama → Colombo Fort", frequency: "Weekdays Only", arrival: "11:27 am", departure: "11:28 am" },
  { id: 81, name: "Colombo Fort → Rambukkana", frequency: "Daily", arrival: "11:44 am", departure: "11:45 am" },
  { id: 82, name: "Rambukkana → Colombo Fort", frequency: "Daily", arrival: "11:51 am", departure: "11:52 am" },
  { id: 83, name: "Colombo Fort → Nooranagar", frequency: "Weekdays Only", arrival: "12:26 pm", departure: "12:27 pm" },
  { id: 84, name: "Colombo Fort → Veyangoda", frequency: "Daily", arrival: "12:34 pm", departure: "12:35 pm" },
  { id: 85, name: "Rambukkana → Colombo Fort", frequency: "Daily", arrival: "01:00 pm", departure: "01:01 pm" },
  { id: 86, name: "Colombo Fort → Nanuoya", frequency: "Daily", arrival: "01:01 pm", departure: "01:02 pm" },
  { id: 87, name: "Colombo Fort → Polgahawela", frequency: "Sunday Only", arrival: "01:21 pm", departure: "01:22 pm" },
  { id: 88, name: "Colombo Fort → Polgahawela", frequency: "Weekdays and Saturday Only", arrival: "01:21 pm", departure: "01:22 pm" },
  { id: 89, name: "Nooranagar → Colombo Fort", frequency: "Saturday and Sunday Only", arrival: "01:30 pm", departure: "01:31 pm" },
  { id: 90, name: "Colombo Fort → Vavuniya", frequency: "Daily", arrival: "01:37 pm", departure: "01:39 pm" },
  { id: 91, name: "Nanuoya → Colombo Fort", frequency: "Daily", arrival: "01:40 pm", departure: "01:41 pm" },
  { id: 92, name: "Colombo Fort → Madampe", frequency: "Daily", arrival: "01:41 pm", departure: "01:42 pm" },
  { id: 93, name: "Colombo Fort → Rambukkana", frequency: "Sunday Only", arrival: "01:51 pm", departure: "01:52 pm" },
  { id: 94, name: "Nooranagar → Colombo Fort", frequency: "Weekdays Only", arrival: "01:52 pm", departure: "01:53 pm" },
  { id: 95, name: "Colombo Fort → Rambukkana", frequency: "Saturday Only", arrival: "01:56 pm", departure: "01:57 pm" },
  { id: 96, name: "Colombo Fort → Rambukkana", frequency: "Weekdays Only", arrival: "01:56 pm", departure: "01:57 pm" },
  { id: 97, name: "Veyangoda → Colombo Fort", frequency: "Daily", arrival: "02:08 pm", departure: "02:09 pm" },
  { id: 98, name: "Colombo Fort → Ambeypussa", frequency: "Weekdays Only", arrival: "02:13 pm", departure: "02:14 pm" },
  { id: 99, name: "Colombo Fort → Veyangoda", frequency: "Weekdays and Saturday Only", arrival: "02:26 pm", departure: "02:27 pm" },
  { id: 100, name: "Colombo Fort → Rambukkana", frequency: "Weekdays and Saturday Only", arrival: "02:30 pm", departure: "02:36 pm" },
  { id: 101, name: "Kurunegala → Colombo Fort", frequency: "Daily", arrival: "02:39 pm", departure: "02:40 pm" },
  { id: 102, name: "Rambukkana → Colombo Fort", frequency: "Daily", arrival: "02:39 pm", departure: "02:40 pm" },
  { id: 103, name: "Udaya Devi (Batticaloa → Colombo Fort)", frequency: "Daily", arrival: "02:46 pm", departure: "02:48 pm" },
  { id: 104, name: "Chilaw → Colombo Fort", frequency: "Daily", arrival: "02:48 pm", departure: "02:50 pm" },
  { id: 105, name: "Colombo Fort → Polgahawela", frequency: "Daily", arrival: "02:51 pm", departure: "02:52 pm" },
  { id: 106, name: "Colombo Fort → Chilaw", frequency: "Daily", arrival: "02:58 pm", departure: "02:59 pm" },
  { id: 107, name: "Colombo Fort → Gampaha", frequency: "Daily", arrival: "03:02 pm", departure: "03:03 pm" },
  { id: 108, name: "Colombo Fort → Polgahawela", frequency: "Daily", arrival: "03:19 pm", departure: "03:25 pm" },
  { id: 109, name: "Rambukkana → Colombo Fort", frequency: "Daily", arrival: "03:24 pm", departure: "03:25 pm" },
  { id: 110, name: "Badulla → Colombo Fort", frequency: "Daily", arrival: "03:26 pm", departure: "03:27 pm" },
  { id: 111, name: "Colombo Fort → Veyangoda", frequency: "Weekdays Only", arrival: "03:49 pm", departure: "03:57 pm" },
  { id: 112, name: "Veyangoda → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "03:58 pm", departure: "03:59 pm" },
  { id: 113, name: "Rambukkana → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "04:08 pm", departure: "04:15 pm" },
  { id: 114, name: "Colombo Fort → Chilaw", frequency: "Saturday and Sunday Only", arrival: "04:11 pm", departure: "04:12 pm" },
  { id: 115, name: "Gampaha → Maradana", frequency: "Daily", arrival: "04:15 pm", departure: "04:16 pm" },
  { id: 116, name: "Colombo Fort → Polgahawela", frequency: "Daily", arrival: "04:17 pm", departure: "04:18 pm" },
  { id: 117, name: "Ambeypussa → Maradana", frequency: "Weekdays Only", arrival: "04:38 pm", departure: "04:39 pm" },
  { id: 118, name: "Colombo Fort → Ragama", frequency: "Weekdays Only", arrival: "04:39 pm", departure: "04:39 pm" },
  { id: 119, name: "Colombo Fort → Mirigama", frequency: "Weekdays Only", arrival: "04:49 pm", departure: "04:50 pm" },
  { id: 120, name: "Ragama → Maradana", frequency: "Weekdays Only", arrival: "04:50 pm", departure: "04:50 pm" },
  { id: 121, name: "Polgahawela → Colombo Fort", frequency: "Saturday and Sunday Only", arrival: "04:54 pm", departure: "04:55 pm" },
  { id: 122, name: "Colombo Fort → Chilaw", frequency: "Sunday Only", arrival: "04:58 pm", departure: "04:59 pm" },
  { id: 123, name: "Polgahawela → Colombo Fort", frequency: "Weekdays Only", arrival: "04:59 pm", departure: "05:00 pm" },
  { id: 124, name: "Colombo Fort → Chilaw", frequency: "Weekdays Only", arrival: "05:01 pm", departure: "05:02 pm" },
  { id: 125, name: "Colombo Fort → Polgahawela", frequency: "Weekdays Only", arrival: "05:07 pm", departure: "05:08 pm" },
  { id: 126, name: "Colombo Fort → Polgahawela", frequency: "Saturday Only", arrival: "05:11 pm", departure: "05:12 pm" },
  { id: 127, name: "Colombo Fort → Negombo", frequency: "Daily", arrival: "05:18 pm", departure: "05:19 pm" },
  { id: 128, name: "Colombo Fort → Rambukkana", frequency: "Daily", arrival: "05:18 pm", departure: "05:20 pm" },
  { id: 129, name: "Colombo Fort → Rambukkana", frequency: "Saturday Only", arrival: "05:20 pm", departure: "05:21 pm" },
  { id: 130, name: "Colombo Fort → Polgahawela", frequency: "Sunday Only", arrival: "05:27 pm", departure: "05:35 pm" },
  { id: 131, name: "Colombo Fort → Ragama", frequency: "Weekdays Only", arrival: "05:29 pm", departure: "05:29 pm" },
  { id: 132, name: "Ragama → Colombo Fort", frequency: "Weekdays Only", arrival: "05:35 pm", departure: "05:35 pm" },
  { id: 133, name: "Colombo Fort → Polgahawela", frequency: "Daily", arrival: "05:41 pm", departure: "05:42 pm" },
  { id: 134, name: "Colombo Fort → Polgahawela", frequency: "Saturday and Sunday Only", arrival: "05:43 pm", departure: "05:44 pm" },
  { id: 135, name: "Colombo Fort → Kurunegala", frequency: "Sunday Only", arrival: "05:44 pm", departure: "05:45 pm" },
  { id: 136, name: "Colombo Fort → Puttalam", frequency: "Saturday Only", arrival: "05:44 pm", departure: "05:45 pm" },
  { id: 137, name: "Colombo Fort → Puttalam", frequency: "Sunday Only", arrival: "05:45 pm", departure: "05:46 pm" },
  { id: 138, name: "Polgahawela → Maradana", frequency: "Daily", arrival: "05:46 pm", departure: "05:47 pm" },
  { id: 139, name: "Puttalam → Colombo Fort", frequency: "Weekdays Only", arrival: "05:52 pm", departure: "06:02 pm" },
  { id: 140, name: "Intercity (Colombo Fort → Kandy)", frequency: "Daily", arrival: "05:55 pm", departure: "05:56 pm" },
  { id: 141, name: "Madampe → Colombo Fort", frequency: "Daily", arrival: "05:56 pm", departure: "05:57 pm" },
  { id: 142, name: "Colombo Fort → Negombo", frequency: "Weekdays and Saturday Only", arrival: "06:01 pm", departure: "06:02 pm" },
  { id: 143, name: "Yal Devi (Kankesanthurai → Mount Lavinia)", frequency: "Daily", arrival: "06:03 pm", departure: "06:07 pm" },
  { id: 144, name: "Colombo Fort → Polgahawela", frequency: "Saturday and Sunday Only", arrival: "06:09 pm", departure: "06:10 pm" },
  { id: 145, name: "Colombo Fort → Polgahawela", frequency: "Weekdays Only", arrival: "06:09 pm", departure: "06:10 pm" },
  { id: 146, name: "Veyangoda → Colombo Fort", frequency: "Weekdays Only", arrival: "06:15 pm", departure: "06:16 pm" },
  { id: 147, name: "Colombo Fort → Polgahawela", frequency: "Weekdays Only", arrival: "06:17 pm", departure: "06:18 pm" },
  { id: 148, name: "Kandy → Colombo Fort", frequency: "Weekdays Only", arrival: "06:17 pm", departure: "06:18 pm" },
  { id: 149, name: "Kandy → Colombo Fort", frequency: "Saturday and Sunday Only", arrival: "06:18 pm", departure: "06:19 pm" },
  { id: 150, name: "Rambukkana → Colombo Fort", frequency: "Daily", arrival: "06:19 pm", departure: "06:27 pm" },
  { id: 151, name: "Colombo Fort → Chilaw", frequency: "Weekdays Only", arrival: "06:31 pm", departure: "06:32 pm" },
  { id: 152, name: "Badulla → Colombo Fort", frequency: "Daily", arrival: "06:34 pm", departure: "06:35 pm" },
  { id: 153, name: "Colombo Fort → Chilaw", frequency: "Saturday and Sunday Only", arrival: "06:36 pm", departure: "06:37 pm" },
  { id: 154, name: "Polgahawela → Colombo Fort", frequency: "Weekdays Only", arrival: "06:38 pm", departure: "06:39 pm" },
  { id: 155, name: "Colombo Fort → Ganewatte", frequency: "Saturday and Sunday Only", arrival: "06:41 pm", departure: "06:42 pm" },
  { id: 156, name: "Colombo Fort → Veyangoda", frequency: "Weekdays Only", arrival: "06:44 pm", departure: "06:45 pm" },
  { id: 157, name: "Mirigama → Colombo Fort", frequency: "Daily", arrival: "06:57 pm", departure: "06:58 pm" },
  { id: 158, name: "Colombo Fort → Rambukkana", frequency: "Sunday Only", arrival: "06:59 pm", departure: "07:01 pm" },
  { id: 159, name: "Colombo Fort → Rambukkana", frequency: "Weekdays and Saturday Only", arrival: "06:59 pm", departure: "07:01 pm" },
  { id: 160, name: "Veyangoda → Colombo Fort", frequency: "Weekdays Only", arrival: "07:05 pm", departure: "07:06 pm" },
  { id: 161, name: "Colombo Fort → Polgahawela", frequency: "Weekdays and Saturday Only", arrival: "07:14 pm", departure: "07:22 pm" },
  { id: 162, name: "Negombo → Colombo Fort", frequency: "Daily", arrival: "07:23 pm", departure: "07:24 pm" },
  { id: 163, name: "Colombo Fort → Polgahawela", frequency: "Sunday Only", arrival: "07:33 pm", departure: "07:40 pm" },
  { id: 164, name: "Chilaw → Colombo Fort", frequency: "Sunday Only", arrival: "07:36 pm", departure: "07:38 pm" },
  { id: 165, name: "Colombo Fort → Chilaw", frequency: "Weekdays Only", arrival: "07:36 pm", departure: "07:37 pm" },
  { id: 166, name: "Chilaw → Colombo Fort", frequency: "Saturday Only", arrival: "07:39 pm", departure: "07:40 pm" },
  { id: 167, name: "Chilaw → Colombo Fort", frequency: "Weekdays Only", arrival: "07:39 pm", departure: "07:40 pm" },
  { id: 168, name: "Colombo Fort → Badulla", frequency: "Daily", arrival: "07:47 pm", departure: "07:48 pm" },
  { id: 169, name: "Colombo Fort → Ambeypussa", frequency: "Weekdays and Saturday Only", arrival: "07:49 pm", departure: "07:50 pm" },
  { id: 170, name: "Polgahawela → Colombo Fort", frequency: "Weekdays Only", arrival: "07:50 pm", departure: "07:54 pm" },
  { id: 171, name: "Badulla → Colombo Fort", frequency: "Daily", arrival: "07:52 pm", departure: "07:53 pm" },
  { id: 172, name: "Negombo → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "08:03 pm", departure: "08:04 pm" },
  { id: 173, name: "Colombo Fort → Rambukkana", frequency: "Daily", arrival: "08:19 pm", departure: "08:27 pm" },
  { id: 174, name: "Polgahawela → Colombo Fort", frequency: "Saturday and Sunday Only", arrival: "08:25 pm", departure: "08:26 pm" },
  { id: 175, name: "Veyangoda → Colombo Fort", frequency: "Weekdays Only", arrival: "08:35 pm", departure: "08:36 pm" },
  { id: 176, name: "Anuradhapura → Colombo Fort", frequency: "Sunday Only", arrival: "08:48 pm", departure: "08:49 pm" },
  { id: 177, name: "Colombo Fort → Chilaw", frequency: "Daily", arrival: "08:51 pm", departure: "08:52 pm" },
  { id: 178, name: "Night Mail (Colombo Fort → Badulla)", frequency: "Daily", arrival: "08:55 pm", departure: "08:57 pm" },
  { id: 179, name: "Nooranagar → Colombo Fort", frequency: "Weekdays Only", arrival: "08:58 pm", departure: "08:59 pm" },
  { id: 180, name: "Rambukkana → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "09:10 pm", departure: "09:15 pm" },
  { id: 181, name: "Puttalam → Colombo Fort", frequency: "Saturday Only", arrival: "09:13 pm", departure: "09:20 pm" },
  { id: 182, name: "Puttalam → Colombo Fort", frequency: "Sunday Only", arrival: "09:13 pm", departure: "09:20 pm" },
  { id: 183, name: "Colombo Fort → Polgahawela", frequency: "Daily", arrival: "09:14 pm", departure: "09:22 pm" },
  { id: 184, name: "Polgahawela → Colombo Fort", frequency: "Saturday and Sunday Only", arrival: "09:36 pm", departure: "09:37 pm" },
  { id: 185, name: "Polgahawela → Colombo Fort", frequency: "Weekdays Only", arrival: "09:36 pm", departure: "09:37 pm" },
  { id: 186, name: "Rambukkana → Maradana", frequency: "Daily", arrival: "09:45 pm", departure: "09:46 pm" },
  { id: 187, name: "Night Mail (Colombo Fort → Trincomalee)", frequency: "Daily", arrival: "09:51 pm", departure: "09:52 pm" },
  { id: 188, name: "Ambeypussa → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "10:03 pm", departure: "10:04 pm" },
  { id: 189, name: "Colombo Fort → Mirigama", frequency: "Daily", arrival: "10:16 pm", departure: "10:17 pm" },
  { id: 190, name: "Polgahawela → Colombo Fort", frequency: "Weekdays and Saturday Only", arrival: "10:47 pm", departure: "10:48 pm" },
  { id: 191, name: "Polgahawela → Colombo Fort", frequency: "Sunday Only", arrival: "10:56 pm", departure: "10:57 pm" },
  { id: 192, name: "Colombo Fort → Rambukkana", frequency: "Daily", arrival: "11:29 pm", departure: "11:30 pm" }
];

export default function RagamaTrainSchedule() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFrequency, setFilterFrequency] = useState('ALL');

  // Real-time tick every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Utility to convert AM/PM time into total daily minutes (0-1439)
  const getMinutesFromMidnight = (timeStr) => {
    if (!timeStr) return 0;
    const match = timeStr.match(/(\d+):(\d+)\s*(am|pm)/i);
    if (!match) return 0;
    let [_, hours, minutes, period] = match;
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    if (period.toLowerCase() === 'pm' && hours < 12) hours += 12;
    if (period.toLowerCase() === 'am' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // Filter & Sort Logic to display NEXT TRAIN AT THE TOP OF THE ORDER
  const filteredAndSortedSchedule = INITIAL_SCHEDULE
    .filter((train) => {
      const matchesSearch = train.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesFrequency = true;
      if (filterFrequency === 'DAILY') matchesFrequency = train.frequency === 'Daily';
      else if (filterFrequency === 'WEEKDAYS') matchesFrequency = train.frequency.includes('Weekday');
      else if (filterFrequency === 'WEEKENDS') matchesFrequency = train.frequency.includes('Saturday') || train.frequency.includes('Sunday');

      return matchesSearch && matchesFrequency;
    })
    .sort((a, b) => {
      const depA = getMinutesFromMidnight(a.departure);
      const depB = getMinutesFromMidnight(b.departure);

      // Calculate time relative to current time (so next immediate train is always #1)
      const diffA = depA >= currentMinutes ? depA - currentMinutes : depA - currentMinutes + 1440;
      const diffB = depB >= currentMinutes ? depB - currentMinutes : depB - currentMinutes + 1440;

      return diffA - diffB;
    });

  return (
    <div className="min-h-screen bg-black text-black font-sans p-2 sm:p-4 md:p-6 select-none">
      <div className="max-w-7xl mx-auto border-4 border-[#22c722] bg-black shadow-[0_0_25px_rgba(192,202,51,0.35)]">
        
        {/* TOP DIGITAL DISPLAY HEADER */}
        <header className="bg-black border-b-4 border-[#22c722] p-4 sm:p-6 text-[#22c722]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#22c722] text-black p-2 rounded-sm">
                <Train className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wider uppercase font-mono">
                  RAGAMA RAILWAY STATION
                </h1>
                <p className="text-xs sm:text-sm tracking-widest text-amber-100/70 font-semibold uppercase">
                  Live Station Departure Schedule
                </p>
              </div>
            </div>

            {/* LIVE DIGITAL CLOCK DISPLAY */}
            <div className="flex items-center gap-3 bg-[#121212] border-2 border-[#22c722] px-5 py-2 text-[#22c722] font-mono rounded">
              <Clock className="w-6 h-6 animate-pulse text-[#22c722]" />
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold tracking-widest leading-none">
                  {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                </div>
                <div className="text-xl tracking-widest text-white uppercase mt-1">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* HIGH-CONTRAST DIGITAL DISPLAY BOARD */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono">
            <thead>
              <tr className="bg-black text-[#22c722] border-b-4 border-[#22c722] text-xs sm:text-sm uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">ORDER</th>
                <th className="py-3 px-4">Train Name / Route</th>
                <th className="py-3 px-4">Frequency</th>
                <th className="py-3 px-4 text-center">Arrival</th>
                <th className="py-3 px-4 text-center">Departure</th>
                <th className="py-3 px-4 text-center">Live Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white font-extrabold">
              {filteredAndSortedSchedule.length > 0 ? (
                filteredAndSortedSchedule.map((train, index) => {
                  const depMin = getMinutesFromMidnight(train.departure);
                  let diff = depMin - currentMinutes;
                  if (diff < 0) diff += 1440; // Next day fallback

                  const isNextTrain = index === 0;

                  // High Contrast Row Styling (Image matching Yellow/Black)
                  const isYellowRow = index % 2 === 0;
                  const rowBg = isYellowRow ? 'bg-[#22c722] text-black' : 'bg-black text-[#22c722]';

                  return (
                    <tr
                      key={train.id}
                      className={`${rowBg} ${isNextTrain ? 'ring-4 ring-red-600 z-10 relative' : ''} hover:opacity-90 transition-opacity`}
                    >
                      {/* Order Counter */}
                      <td className="py-3 px-4 text-center font-black">
                        {isNextTrain ? (
                          <span className="inline-block px-1.5 py-0.5 bg-red-600 text-white text-xs font-bold uppercase rounded">
                            NEXT
                          </span>
                        ) : (
                          String(index + 1).padStart(2, '0')
                        )}
                      </td>

                      {/* Route Name */}
                      <td className="py-3 px-4 uppercase tracking-wide font-extrabold">
                        {train.name}
                      </td>

                      {/* Frequency */}
                      <td className="py-3 px-4 text-lg uppercase font-extrabold">
                        {train.frequency}
                      </td>

                      {/* Arrival */}
                      <td className="py-3 px-4 text-center tracking-widest font-mono">
                        {train.arrival}
                      </td>

                      {/* Departure */}
                      <td className="py-3 px-4 text-center tracking-widest font-mono font-black">
                        {train.departure}
                      </td>

                      {/* Dynamic Live Status Tag */}
                      <td className="py-3 px-4 text-center">
                        {diff === 0 ? (
                          <span className="inline-block px-2 py-1 bg-red-600 text-white text-[11px] font-bold tracking-wider rounded animate-bounce uppercase">
                            DEPARTING NOW
                          </span>
                        ) : diff <= 15 ? (
                          <span className="inline-block px-2 py-1 bg-red-600 text-white text-[11px] font-bold tracking-wider rounded animate-pulse uppercase">
                            Boarding ({diff}m)
                          </span>
                        ) : diff <= 60 ? (
                          <span className="inline-block px-2 py-1 bg-amber-500 text-black text-[11px] font-bold tracking-wider rounded uppercase">
                            In {diff} Mins
                          </span>
                        ) : (
                          <span className="text-[11px] opacity-80 tracking-wider uppercase">
                            In {Math.floor(diff / 60)}h {diff % 60}m
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-[#22c722] bg-black">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="w-8 h-8 text-amber-400" />
                      <p className="text-lg font-bold uppercase">No matching trains found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <footer className="bg-black text-[#22c722] p-4 border-t-4 border-[#22c722] text-center text-xs tracking-wider font-mono">
          <p className="uppercase font-bold">
            Sri Lanka Railways • Ragama Station Live Departure System
          </p>
        </footer>
      </div>
    </div>
  );
}