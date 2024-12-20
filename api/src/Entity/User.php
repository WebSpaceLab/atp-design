<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use App\Repository\UserRepository;
use App\Trait\Timestamps;
use Carbon\Carbon;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\VarDumper\Cloner\Data;

#[ORM\Entity(repositoryClass: UserRepository::class)]
// #[ApiResource(
//     operations: [
//         new Get(
//             normalizationContext: ['groups' => ['user:auth']],
//         ),
//         new Post(
//             uriTemplate: '/users',
//             input: User::class,
//             output: User::class,
//             normalizationContext: ['groups' => ['user:read']],
//             denormalizationContext: ['groups' => ['user:create']],
//         ),
//         new GetCollection(
//             uriTemplate: '/users',
//             normalizationContext: ['groups' => ['user:read']],
//         ),
//         new Get(
//             uriTemplate: '/users/{id}/profile',
//             normalizationContext: ['groups' => ['profile:read']],

//         ),
//         new Patch(
//             uriTemplate: '/users/{id}/profile/update',
//             normalizationContext: ['groups' => ['profile:read']],
//             denormalizationContext: ['groups' => ['profile:write']],
//         ),
//     ],
// )]

// #[ApiFilter(SearchFilter::class, properties: ['username' => 'partial', 'email' => 'exact'])]
// #[ApiFilter(DateFilter::class, properties: ['createdAt', 'updatedAt'])]
// #[ApiFilter(OrderFilter::class, properties: ['createdAt', 'updatedAt'], arguments: ['orderParameterName' => 'order'])]
#[ORM\Table(name: '`user`')]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[ORM\HasLifecycleCallbacks()]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use Timestamps;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'media:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user:read','profile:read', 'user:auth','media:read'])]
    private ?string $avatarUrl = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank(message: 'Please enter an email address.', groups: ['register', 'profile:write'])]
    #[Assert\Email(groups: ['register', 'profile:write'])]
    #[Groups(['user:read','profile:read', 'user:auth'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['user:read','profile:read', 'user:auth'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Assert\NotBlank(groups: ['register'])]
    // #[Assert\Length(min: 6, max: 20, groups: ['register'])]
    #[Assert\NotCompromisedPassword()]
    private ?string $password = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotBlank(groups: ['register', 'profile:write'])]
    #[Assert\Length(min: 2, groups: ['register', 'profile:write'])]
    #[Groups(['user:read','profile:read', 'user:auth', 'media:read'])]
    private ?string $username = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Length(min: 2, groups: ['register', 'profile:write'])]
    #[Groups(['user:read','profile:read', 'profile:write', 'media:read'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Length(min: 2, groups: ['register', 'profile:write'])]
    #[Groups(['user:read','profile:read', 'profile:write', 'media:read'])]
    private ?string $lastName = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Assert\Length(min: 2, groups: ['profile:write'])]
    #[Groups(['user:read', 'profile:read', 'profile:write'])]
    private ?string $bio = null;

    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?bool $isActiveAccount = false;

    #[ORM\Column]
    #[Assert\NotBlank(message: 'Consent is required.', groups: ['register'])]
    #[Assert\Type(type: 'bool', groups: ['register'])]
    #[Groups(['user:read'])]
    private ?bool $isAgree = false;

    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?bool $isDelete = false;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Article::class)]
    private Collection $articles;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Comment::class)]
    private Collection $comments;

    #[ORM\OneToOne(mappedBy: 'ownedBy', cascade: ['persist', 'remove'])]
    private VerificationToken $verificationToken;

    #[ORM\OneToMany(mappedBy: 'ownedBy', targetEntity: ResetPasswordToken::class)]
    private Collection $resetPasswordTokens;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Media::class)]
    private Collection $media;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Inbox::class)]
    private Collection $inboxes;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Gallery::class)]
    private Collection $galleries;

    #[ORM\OneToOne(mappedBy: 'ownedBy', cascade: ['persist', 'remove'])]
    private ?ApiToken $apiToken = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->articles = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->resetPasswordTokens = new ArrayCollection();
        $this->media = new ArrayCollection();
        $this->inboxes = new ArrayCollection();
        $this->galleries = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(?string $bio): static
    {
        $this->bio = $bio;

        return $this;
    }
    
    public function getAvatarUrl(): ?string
    {
        $avatarUrl = $this->avatarUrl;

        if($avatarUrl) {
            return 'http://127.0.0.1:8000' . $this->avatarUrl;
        }

        return 'http://127.0.0.1:8000/user-placeholder.png';
    }

    public function setAvatarUrl(?string $avatarUrl): static
    {
        $this->avatarUrl = $avatarUrl;

        return $this;
    }

    public function isIsActiveAccount(): ?bool
    {
        return $this->isActiveAccount;
    }

    public function setIsActiveAccount(bool $isActiveAccount): static
    {
        $this->isActiveAccount = $isActiveAccount;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): static
    {
        if (!$this->articles->contains($article)) {
            $this->articles->add($article);
            $article->setAuthor($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): static
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getAuthor() === $this) {
                $article->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setOwner($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getOwner() === $this) {
                $comment->setOwner(null);
            }
        }

        return $this;
    }

    #[Groups(['user:auth'])]
    public function getApiTokenExpiresAt()
    {
        // return $this->apiToken->getExpiresAt();
        return Carbon::instance($this->apiToken->getExpiresAt())->toDateTimeString();
    }


    #[Groups(['profile:read', 'user:read'])]
    public function getCreatedAtAgo(): ?string
    {
        return  Carbon::instance($this->createdAt)->diffForHumans();
    }

    #[Groups(['profile:read', 'user:read'])]
    public function getUpdatedAtAgo(): ?string
    {
        $updatedAtAgo = $this->updatedAt;

        if ($updatedAtAgo) {
            $updatedAtAgo = Carbon::instance($updatedAtAgo)->diffForHumans();
        }

        return  $updatedAtAgo;
    }

    public function getVerificationToken(): ?VerificationToken
    {
        return $this->verificationToken;
    }

    public function setVerificationToken(?VerificationToken $verificationToken): static
    {
        // unset the owning side of the relation if necessary
        if ($verificationToken === null && $this->verificationToken !== null) {
            $this->verificationToken->setOwnedBy(null);
        }

        // set the owning side of the relation if necessary
        if ($verificationToken !== null && $verificationToken->getOwnedBy() !== $this) {
            $verificationToken->setOwnedBy($this);
        }

        $this->verificationToken = $verificationToken;

        return $this;
    }

    /**
     * @return Collection<int, ResetPasswordToken>
     */
    public function getResetPasswordTokens(): Collection
    {
        return $this->resetPasswordTokens;
    }

    public function addResetPasswordToken(ResetPasswordToken $resetPasswordToken): static
    {
        if (!$this->resetPasswordTokens->contains($resetPasswordToken)) {
            $this->resetPasswordTokens->add($resetPasswordToken);
            $resetPasswordToken->setOwnedBy($this);
        }

        return $this;
    }

    public function removeResetPasswordToken(ResetPasswordToken $resetPasswordToken): static
    {
        if ($this->resetPasswordTokens->removeElement($resetPasswordToken)) {
            // set the owning side to null (unless already changed)
            if ($resetPasswordToken->getOwnedBy() === $this) {
                $resetPasswordToken->setOwnedBy(null);
            }
        }

        return $this;
    }

    public function isIsAgree(): ?bool
    {
        return $this->isAgree;
    }

    public function setIsAgree(bool $isAgree): static
    {
        $this->isAgree = $isAgree;

        return $this;
    }

    /**
     * @return Collection<int, Media>
     */
    public function getMedia(): Collection
    {
        return $this->media;
    }

    public function addMedium(Media $medium): static
    {
        if (!$this->media->contains($medium)) {
            $this->media->add($medium);
            $medium->setAuthor($this);
        }

        return $this;
    }

    public function removeMedium(Media $medium): static
    {
        if ($this->media->removeElement($medium)) {
            // set the owning side to null (unless already changed)
            if ($medium->getAuthor() === $this) {
                $medium->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Inbox>
     */
    public function getInboxes(): Collection
    {
        return $this->inboxes;
    }

    public function addInbox(Inbox $inbox): static
    {
        if (!$this->inboxes->contains($inbox)) {
            $this->inboxes->add($inbox);
            $inbox->setOwner($this);
        }

        return $this;
    }

    public function removeInbox(Inbox $inbox): static
    {
        if ($this->inboxes->removeElement($inbox)) {
            // set the owning side to null (unless already changed)
            if ($inbox->getOwner() === $this) {
                $inbox->setOwner(null);
            }
        }

        return $this;
    }

    public function isIsDelete(): ?bool
    {
        return $this->isDelete;
    }

    public function setIsDelete(bool $isDelete): static
    {
        $this->isDelete = $isDelete;

        return $this;
    }

    /**
     * @return Collection<int, Gallery>
     */
    public function getGalleries(): Collection
    {
        return $this->galleries;
    }

    public function addGallery(Gallery $gallery): static
    {
        if (!$this->galleries->contains($gallery)) {
            $this->galleries->add($gallery);
            $gallery->setAuthor($this);
        }

        return $this;
    }

    public function removeGallery(Gallery $gallery): static
    {
        if ($this->galleries->removeElement($gallery)) {
            // set the owning side to null (unless already changed)
            if ($gallery->getAuthor() === $this) {
                $gallery->setAuthor(null);
            }
        }

        return $this;
    }

    public function __toString()
    {
        // zwraca unikalny identyfikator lub inną właściwość encji
        return $this->username;
    }

    public function getApiToken(): ?ApiToken
    {
        return $this->apiToken;
    }

    public function setApiToken(?ApiToken $apiToken): static
    {
        // unset the owning side of the relation if necessary
        if ($apiToken === null && $this->apiToken !== null) {
            $this->apiToken->setOwnedBy(null);
        }

        // set the owning side of the relation if necessary
        if ($apiToken !== null && $apiToken->getOwnedBy() !== $this) {
            $apiToken->setOwnedBy($this);
        }

        $this->apiToken = $apiToken;

        return $this;
    }
}
