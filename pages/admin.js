import React, { useState, useEffect } from 'react';
import { useAuth, USER_TYPES } from '../components/AuthContext';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [htmlContent, setHtmlContent] = useState('');
  const [message, setMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [contentSections, setContentSections] = useState([
    {
      id: 'homepage-intro',
      title: 'Homepage Introduction',
      content: '<h2>Welcome to the Pharmaceutical Tariff Analyzer</h2><p>This tool helps pharmaceutical companies evaluate if it\'s cheaper to source products in the US or outside even with tariffs.</p>'
    },
    {
      id: 'tariff-info',
      title: 'Tariff Information',
      content: '<h3>Current Tariff Rates</h3><p>The current pharmaceutical tariff rates range from 5% to 25% depending on the product category and country of origin.</p>'
    },
    {
      id: 'analysis-tool',
      title: 'Analysis Tool Description',
      content: '<h3>Supply Chain Optimizer</h3><p>Our supply chain optimizer uses advanced algorithms to calculate the most cost-effective sourcing strategy based on current tariff rates.</p>'
    }
  ]);
  const [selectedSection, setSelectedSection] = useState(null);

  // Redirect if not admin
  useEffect(() => {
    if (!user.isAuthenticated || user.userType !== USER_TYPES.ADMIN) {
      router.push('/login');
    }
  }, [user, router]);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setHtmlContent(section.content);
    setMessage('');
  };

  const handleContentChange = (e) => {
    setHtmlContent(e.target.value);
  };

  const handleSaveContent = () => {
    if (!selectedSection) return;
    
    const updatedSections = contentSections.map(section => {
      if (section.id === selectedSection.id) {
        return { ...section, content: htmlContent };
      }
      return section;
    });
    
    setContentSections(updatedSections);
    setSelectedSection({ ...selectedSection, content: htmlContent });
    setMessage('Content updated successfully!');
    
    // In a real application, this would save to a database or API
    // For this example, we're just updating the state
  };

  // If not authenticated or not admin, don't render the dashboard
  if (!user.isAuthenticated || user.userType !== USER_TYPES.ADMIN) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.username}! You are logged in as an administrator.</p>
      
      <div className="dashboard-container">
        <div className="content-sections">
          <h2>
            HTML Content Sections
            <span 
              className="tooltip-icon" 
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              ?
            </span>
          </h2>
          {showTooltip && (
            <div className="tooltip">
              Select a section to edit its HTML content. Changes will be reflected on the main page.
            </div>
          )}
          <p>Select a section to edit:</p>
          <ul>
            {contentSections.map(section => (
              <li 
                key={section.id} 
                onClick={() => handleSectionSelect(section)}
                className={selectedSection && selectedSection.id === section.id ? 'selected' : ''}
              >
                {section.title}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="content-editor">
          {selectedSection ? (
            <>
              <h2>Editing: {selectedSection.title}</h2>
              <textarea
                value={htmlContent}
                onChange={handleContentChange}
                rows={10}
                cols={50}
              />
              <div className="button-container">
                <button onClick={handleSaveContent}>Save Changes</button>
              </div>
              {message && <div className="success-message">{message}</div>}
              
              <div className="preview">
                <h3>Preview:</h3>
                <div 
                  className="html-preview"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            </>
          ) : (
            <p>Select a section to edit its HTML content.</p>
          )}
        </div>
      </div>
    </div>
  );
}
