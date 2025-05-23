
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const templates = {
  podcast: [
    {
      id: 1,
      title: "Interview Format",
      description: "Standard podcast interview structure",
      content: `# [PODCAST NAME] - EPISODE [NUMBER]
## Guest: [GUEST NAME] - [GUEST TITLE]

### INTRO (2-3 minutes)
[HOST]: Welcome to [PODCAST NAME]. I'm your host [HOST NAME] and today we're talking with [GUEST] about [TOPIC].

### GUEST INTRODUCTION (3-5 minutes)
[HOST]: Can you tell our listeners a bit about yourself and your background?
[GUEST]: *Brief introduction*

### MAIN SEGMENTS (20-30 minutes)
#### Segment 1: [TOPIC 1]
[HOST]: Question about Topic 1?
[GUEST]: Response

#### Segment 2: [TOPIC 2]
[HOST]: Question about Topic 2?
[GUEST]: Response

### QUICK-FIRE ROUND (5 minutes)
[HOST]: We're going to do a quick-fire round now. Just answer with the first thing that comes to mind.
1. What's one book you recommend everyone should read?
2. What's your morning routine like?
3. What's a tool or resource you can't live without?

### CLOSING (2-3 minutes)
[HOST]: Before we end, where can people find you online?
[GUEST]: *Social media, website details*

[HOST]: Thank you for joining us today. To our listeners, thanks for tuning in to [PODCAST NAME].`
    },
    {
      id: 2,
      title: "Solo Format",
      description: "Template for solo podcast episodes",
      content: `# [PODCAST NAME] - EPISODE [NUMBER]
## Topic: [MAIN TOPIC]

### INTRO (1-2 minutes)
Hello and welcome to [PODCAST NAME]. I'm [YOUR NAME] and today we're diving into [TOPIC].

### EPISODE OVERVIEW (1 minute)
In this episode, we'll cover:
- Point 1
- Point 2
- Point 3

### MAIN CONTENT (15-20 minutes)
#### Section 1: [SUB-TOPIC 1]
- Key point 1
- Key point 2
- Personal story or example

#### Section 2: [SUB-TOPIC 2]
- Key point 1
- Key point 2
- Data or research to support points

#### Section 3: [SUB-TOPIC 3]
- Key point 1
- Key point 2
- Actionable advice for listeners

### KEY TAKEAWAYS (2-3 minutes)
Let's summarize what we've covered today:
1. First takeaway
2. Second takeaway
3. Third takeaway

### CALL TO ACTION (1 minute)
If you enjoyed this episode, please rate, review, and subscribe. You can also find me at [WEBSITE] or on social media at [HANDLE].

### CLOSING (30 seconds)
Thanks for listening to [PODCAST NAME]. I'm [YOUR NAME], and I'll catch you in the next episode.`
    }
  ],
  video: [
    {
      id: 3,
      title: "YouTube Tutorial",
      description: "Template for instructional videos",
      content: `# [VIDEO TITLE]
## [YOUR CHANNEL NAME]

### HOOK (0:00-0:30)
- Grab attention with a bold statement or question
- Show what viewers will learn
- Briefly mention the outcome they'll achieve

### INTRO (0:30-1:00)
- "Hey everyone, it's [YOUR NAME] and today I'm going to show you [TOPIC]"
- Briefly introduce yourself (for new viewers)
- Quick overview of what you'll cover

### MAIN CONTENT (1:00-8:00)
#### Step 1: [FIRST STEP] (1:00-3:00)
- Detailed explanation
- Show the process
- Highlight important details or warnings

#### Step 2: [SECOND STEP] (3:00-5:00)
- Detailed explanation
- Show the process
- Tips for best results

#### Step 3: [THIRD STEP] (5:00-8:00)
- Detailed explanation
- Show the process
- Common mistakes to avoid

### SHOWCASE RESULTS (8:00-9:00)
- Show the completed project/result
- Highlight key features or benefits

### CONCLUSION (9:00-10:00)
- Recap what you covered
- Emphasize the main benefit
- Thank viewers for watching

### CALL TO ACTION (10:00-10:30)
- Ask viewers to like and subscribe
- Mention related videos they might enjoy
- Invite comments and questions`
    },
    {
      id: 4,
      title: "Product Review",
      description: "Template for product review videos",
      content: `# [PRODUCT NAME] Review - Is It Worth It?
## [YOUR CHANNEL NAME]

### INTRO (0:00-1:00)
- Introduce the product
- Mention how long you've been using it
- Disclose if this is a sponsored review

### PRODUCT OVERVIEW (1:00-3:00)
- Show the product from all angles
- Discuss specs and features
- Compare to similar products in the market

### PROS (3:00-5:00)
- Pro #1: [DETAIL]
- Pro #2: [DETAIL]
- Pro #3: [DETAIL]

### CONS (5:00-7:00)
- Con #1: [DETAIL]
- Con #2: [DETAIL]
- Con #3: [DETAIL]

### PERFORMANCE TESTS (7:00-9:00)
- Test #1 results
- Test #2 results
- Real-world usage examples

### WHO IS THIS FOR? (9:00-10:00)
- Ideal user profile
- Use cases
- Who should avoid this product

### PRICING & VALUE (10:00-11:00)
- Current price
- Is it good value?
- Alternative options to consider

### FINAL VERDICT (11:00-12:00)
- Overall rating
- Final recommendation
- Would you buy it again?

### OUTRO (12:00-12:30)
- Thank viewers for watching
- Ask for comments on their experience
- Like and subscribe reminder`
    }
  ]
};

const ScriptTemplates = () => {
  const [activeTab, setActiveTab] = useState("podcast");
  const [selectedTemplate, setSelectedTemplate] = useState(templates.podcast[0]);
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTemplate.content);
    setCopied(true);
    toast.success("Template copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([selectedTemplate.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate.title.replace(/\s+/g, '-').toLowerCase()}-template.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Template downloaded successfully!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Script Templates</CardTitle>
        <CardDescription>
          Ready-to-use templates for your recording sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="podcast" 
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            setSelectedTemplate(templates[value as keyof typeof templates][0]);
          }}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="podcast">Podcast Templates</TabsTrigger>
            <TabsTrigger value="video">Video Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="podcast" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {templates.podcast.map(template => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-colors ${selectedTemplate.id === template.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{template.title}</CardTitle>
                    <CardDescription className="text-xs">{template.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {templates.video.map(template => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-colors ${selectedTemplate.id === template.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{template.title}</CardTitle>
                    <CardDescription className="text-xs">{template.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{selectedTemplate.title}</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md max-h-96 overflow-y-auto">
            <pre className="text-xs whitespace-pre-wrap font-mono">
              {selectedTemplate.content}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScriptTemplates;
