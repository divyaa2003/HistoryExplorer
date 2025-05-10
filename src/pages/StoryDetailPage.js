import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Share2, Download, ExternalLink } from 'lucide-react';

const StoryDetailPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedStories, setRelatedStories] = useState([]);

  // Mock data for demonstration
  const storyData = {
    'vishnu-story1': {
      title: 'Creation of the Universe',
      purana: 'Vishnu Purana',
      puranaId: 'vishnu',
      content: `
        <p>According to the Vishnu Purana, before creation, there was only water everywhere and Vishnu was sleeping on these waters on the great serpent Shesha. From Vishnu's navel grew a lotus, and from this lotus emerged Brahma, the creator.</p>
        
        <p>Vishnu instructed Brahma to create the world, and Brahma created all living beings and the different worlds. The Vishnu Purana describes the universe as consisting of seven islands (dvipas) surrounded by seven oceans. At the center is Jambudvipa, where humans live.</p>
        
        <p>The Vishnu Purana also describes the concept of time cycles. According to this, the universe goes through cycles of creation and destruction. Each cycle consists of four yugas or ages: Satya Yuga, Treta Yuga, Dvapara Yuga, and Kali Yuga. We are currently in Kali Yuga, which is the last and most degraded of the four ages.</p>
        
        <p>After the completion of Kali Yuga, the universe will be destroyed and then recreated, beginning a new cycle. This cycle of creation and destruction is endless, symbolizing the eternal nature of existence.</p>
        
        <p>The Vishnu Purana emphasizes that Vishnu is the supreme deity who maintains the universe. He incarnates in different forms (avatars) whenever dharma (righteousness) declines and adharma (unrighteousness) increases, to restore cosmic order.</p>
      `,
      image: 'creation.jpg',
      references: [
        { text: 'Vishnu Purana, Book I, Chapter I-IV', url: '#' },
        { text: 'Doniger, Wendy. "Hindu Myths: A Sourcebook"', url: '#' },
      ],
      characters: ['Vishnu', 'Brahma', 'Shesha'],
      concepts: ['Creation', 'Yugas', 'Cosmic Cycles'],
    },
    'vishnu-story2': {
      title: 'Samudra Manthan (Churning of the Ocean)',
      purana: 'Vishnu Purana',
      puranaId: 'vishnu',
      content: `
        <p>The Samudra Manthan, or the churning of the cosmic ocean, is one of the most famous stories from Hindu mythology, described in detail in the Vishnu Purana.</p>
        
        <p>The story begins when the devas (gods) were weakened and lost their immortality due to a curse from the sage Durvasa. They approached Lord Vishnu for help, who advised them to churn the cosmic ocean to obtain amrita, the nectar of immortality.</p>
        
        <p>However, the devas alone were not strong enough for this task, so they formed an alliance with their enemies, the asuras (demons). They used Mount Mandara as the churning rod and the serpent Vasuki as the churning rope. Vishnu himself incarnated as a turtle (Kurma avatar) to support the mountain on his back.</p>
        
        <p>As they churned, many treasures emerged from the ocean: Kamadhenu (the wish-fulfilling cow), Uchaishravas (the white horse), Airavata (the white elephant), Kaustubha (the most valuable jewel in the world), Kalpavriksha (the wish-granting tree), Lakshmi (the goddess of wealth), and finally, Dhanvantari (the divine physician) carrying the pot of amrita.</p>
        
        <p>However, before the amrita could be distributed, a deadly poison called Halahala emerged, threatening to destroy the world. Lord Shiva came to the rescue by consuming the poison, which turned his throat blue (earning him the name Neelakantha, or "blue-throated one").</p>
        
        <p>When the amrita finally appeared, the asuras seized it. To prevent them from becoming immortal, Vishnu took the form of a beautiful woman named Mohini, who distracted the asuras and distributed the amrita only to the devas.</p>
        
        <p>One asura, Rahu, disguised himself as a deva and drank some amrita. The Sun and Moon gods recognized him and informed Vishnu, who immediately severed Rahu's head with his discus. However, since Rahu had already consumed the nectar, his head became immortal. To this day, Rahu occasionally swallows the Sun or Moon, causing eclipses, but since he has no body, they soon reappear.</p>
      `,
      image: 'samudra-manthan.jpg',
      references: [
        { text: 'Vishnu Purana, Book I, Chapter IX', url: '#' },
        { text: 'Wilkins, W.J. "Hindu Mythology, Vedic and Puranic"', url: '#' },
      ],
      characters: ['Vishnu', 'Kurma', 'Lakshmi', 'Dhanvantari', 'Shiva', 'Rahu'],
      concepts: ['Immortality', 'Cooperation', 'Cosmic Balance'],
    },
    'bhagavata-story1': {
      title: 'The Life of Krishna',
      purana: 'Bhagavata Purana',
      puranaId: 'bhagavata',
      content: `
        <p>The Bhagavata Purana contains the most detailed account of Krishna's life, particularly in its tenth book (skandha). Krishna is portrayed as the eighth avatar of Vishnu, who took birth to rid the world of evil forces, particularly his uncle Kamsa.</p>
        
        <p>Before Krishna's birth, a prophecy told Kamsa that the eighth child of his sister Devaki would kill him. In fear, Kamsa imprisoned Devaki and her husband Vasudeva and killed their first six children. The seventh child, Balarama, was secretly transferred to the womb of Rohini, another wife of Vasudeva.</p>
        
        <p>When Krishna was born, divine intervention helped Vasudeva escape the prison with the newborn. He crossed the Yamuna river, which parted to make way for him, and reached the house of Nanda and Yashoda in Gokul, where he exchanged Krishna with their newborn daughter (who was actually goddess Yogamaya). When Kamsa tried to kill this baby, she transformed into her divine form and warned him that his destroyer was already safe elsewhere.</p>
        
        <p>Krishna grew up in Gokul and later Vrindavan, where he performed many miraculous feats, such as lifting the Govardhan hill to protect the villagers from a storm sent by Indra, and killing various demons sent by Kamsa. His childhood was also filled with playful activities (lilas) with the gopis (cowherd girls), especially Radha, who became his primary consort.</p>
        
        <p>As a young man, Krishna went to Mathura and killed Kamsa, fulfilling the prophecy. He then became a prince and later established his kingdom at Dwaraka. He played a crucial role in the Mahabharata war, serving as Arjuna's charioteer and delivering the Bhagavad Gita, a philosophical dialogue on duty, devotion, and spiritual knowledge.</p>
        
        <p>Krishna's life ended when he was accidentally shot in the foot by a hunter named Jara, who mistook his foot for a deer. This was the only vulnerable part of his body. After his departure, the Kali Yuga (the current age of darkness) began.</p>
      `,
      image: 'krishna.jpg',
      references: [
        { text: 'Bhagavata Purana, Skandha X', url: '#' },
        { text: 'Bryant, Edwin. "Krishna: The Beautiful Legend of God"', url: '#' },
      ],
      characters: ['Krishna', 'Radha', 'Kamsa', 'Devaki', 'Vasudeva', 'Yashoda'],
      concepts: ['Avatar', 'Lila', 'Bhakti'],
    },
    'shiva-story1': {
      title: 'Marriage of Shiva and Parvati',
      purana: 'Shiva Purana',
      puranaId: 'shiva',
      content: `
        <p>The Shiva Purana narrates the beautiful love story of Shiva and Parvati, which begins with tragedy and culminates in divine union.</p>
        
        <p>Shiva's first wife was Sati, daughter of Daksha. When Daksha organized a grand yagna (fire sacrifice) but deliberately did not invite Shiva, Sati felt deeply insulted. Despite Shiva's warnings, she attended the yagna, where Daksha publicly insulted Shiva. Unable to bear this humiliation, Sati immolated herself in the sacrificial fire.</p>
        
        <p>Enraged by Sati's death, Shiva created Virabhadra, who destroyed Daksha's yagna and beheaded him (though Shiva later revived him with a goat's head). Shiva then carried Sati's burning body, grief-stricken and dancing in fury. To stop his destructive dance, Vishnu used his Sudarshana Chakra to cut Sati's body into pieces, which fell at various places that became sacred sites known as Shakti Peethas.</p>
        
        <p>Sati was later reborn as Parvati, daughter of the mountain king Himavan and queen Mena. From a young age, Parvati was devoted to Shiva and decided she would marry only him. However, after Sati's death, Shiva had withdrawn into deep meditation on Mount Kailash and had become completely detached from the world.</p>
        
        <p>To win Shiva's attention, Parvati began severe penance. She meditated in extreme conditions - during scorching summers, freezing winters, and torrential rains. Her dedication impressed the gods, who approached Shiva and pleaded with him to acknowledge her devotion.</p>
        
        <p>To test Parvati's devotion, Shiva disguised himself as an old Brahmin and criticized himself, saying Shiva was an unsuitable husband. Parvati, recognizing this as a test, remained steadfast in her devotion. Impressed, Shiva revealed his true form and agreed to marry her.</p>
        
        <p>Their wedding was a grand cosmic event attended by all gods. Brahma himself performed the ceremony. The union of Shiva and Parvati represents the cosmic balance between consciousness (Shiva) and energy (Shakti), and their marriage symbolizes the perfect harmony of masculine and feminine energies in the universe.</p>
      `,
      image: 'shiva-parvati.jpg',
      references: [
        { text: 'Shiva Purana, Rudra Samhita, Chapters 24-49', url: '#' },
        { text: 'O\'Flaherty, Wendy Doniger. "Śiva: The Erotic Ascetic"', url: '#' },
      ],
      characters: ['Shiva', 'Parvati', 'Sati', 'Daksha', 'Himavan'],
      concepts: ['Devotion', 'Divine Union', 'Cosmic Balance'],
    },
  };

  // Mock related stories
  const mockRelatedStories = {
    'vishnu-story1': [
      { id: 'vishnu-story2', title: 'Samudra Manthan', purana: 'Vishnu Purana' },
      { id: 'bhagavata-story1', title: 'The Life of Krishna', purana: 'Bhagavata Purana' },
    ],
    'vishnu-story2': [
      { id: 'vishnu-story1', title: 'Creation of the Universe', purana: 'Vishnu Purana' },
      { id: 'shiva-story1', title: 'Marriage of Shiva and Parvati', purana: 'Shiva Purana' },
    ],
    'bhagavata-story1': [
      { id: 'vishnu-story1', title: 'Creation of the Universe', purana: 'Vishnu Purana' },
      { id: 'vishnu-story2', title: 'Samudra Manthan', purana: 'Vishnu Purana' },
    ],
    'shiva-story1': [
      { id: 'vishnu-story2', title: 'Samudra Manthan', purana: 'Vishnu Purana' },
      { id: 'bhagavata-story1', title: 'The Life of Krishna', purana: 'Bhagavata Purana' },
    ],
  };

  useEffect(() => {
    // Simulate API call to fetch story details
    setLoading(true);
    setTimeout(() => {
      setStory(storyData[id] || null);
      setRelatedStories(mockRelatedStories[id] || []);
      setLoading(false);
      
      // Scroll to top when story changes
      window.scrollTo(0, 0);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
        <p className="text-gray-600 mb-8">The story you're looking for doesn't exist or is not available.</p>
        <Link 
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Hero Section */}
      <div className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <Link to={`/purana/${story.puranaId}`} className="inline-flex items-center text-accent hover:text-white mb-4">
            <ArrowLeft size={16} className="mr-2" /> Back to {story.purana}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
            <p className="text-xl">From the {story.purana}</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Story Image */}
            <div className="mb-8 bg-gray-200 rounded-lg overflow-hidden h-64">
              {/* Placeholder for story image */}
              <div className="w-full h-full flex items-center justify-center bg-secondary bg-opacity-10">
                <span className="text-2xl font-bold text-secondary">{story.title}</span>
              </div>
            </div>

            {/* Story Content */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: story.content }}
              />
            </div>

            {/* References */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">References</h2>
              <ul className="space-y-2">
                {story.references.map((ref, index) => (
                  <li key={index} className="flex items-start">
                    <ExternalLink size={16} className="text-primary mr-2 mt-1" />
                    <a href={ref.url} className="text-primary hover:underline">{ref.text}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Stories */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Related Stories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedStories.map((relatedStory) => (
                  <Link 
                    key={relatedStory.id} 
                    to={`/story/${relatedStory.id}`}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-bold mb-2">{relatedStory.title}</h3>
                    <p className="text-gray-600">From {relatedStory.purana}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center">
                  <Share2 size={16} className="mr-2" /> Share Story
                </button>
                <button className="w-full border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
                  <Download size={16} className="mr-2" /> Download PDF
                </button>
              </div>
            </div>

            {/* Key Characters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Key Characters</h3>
              <ul className="space-y-2">
                {story.characters.map((character, index) => (
                  <li key={index} className="bg-gray-100 px-3 py-2 rounded-md">{character}</li>
                ))}
              </ul>
            </div>

            {/* Key Concepts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Key Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {story.concepts.map((concept, index) => (
                  <span key={index} className="bg-secondary bg-opacity-10 text-secondary px-3 py-1 rounded-full">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPage;
